# syntax=docker/dockerfile:1
ARG FRANKENPHP_VERSION=1.12.6
ARG PHP_VERSION=8.5.9
ARG COMPOSER_VERSION=2.10.2

FROM composer:${COMPOSER_VERSION} AS composer

FROM dunglas/frankenphp:${FRANKENPHP_VERSION}-php${PHP_VERSION}-alpine AS base

RUN install-php-extensions pdo_pgsql redis zip pcntl
COPY --from=composer /usr/bin/composer /usr/bin/composer

ARG USER=appuser
ARG USER_UID=1000
ARG USER_GID=1000
RUN <<'EOF'
    set -eu
    test "${USER_UID}" -gt 0
    test "${USER_GID}" -gt 0
    runtime_group="$(awk -F: -v gid="${USER_GID}" '$3 == gid { print $1; exit }' /etc/group)"
    if [ -z "${runtime_group}" ]; then
        addgroup -S -g "${USER_GID}" "${USER}"
        runtime_group="${USER}"
    fi
    adduser -S -D -u "${USER_UID}" -G "${runtime_group}" "${USER}"
    setcap -r /usr/local/bin/frankenphp
    mkdir -p /app /config/caddy /data/caddy "/home/${USER}/.composer"
    chown -R "${USER}:${runtime_group}" /app /config/caddy /data/caddy "/home/${USER}"
EOF

ENV APP_USER=${USER} \
    COMPOSER_HOME=/home/${USER}/.composer \
    SERVER_NAME=:8000 \
    OCTANE_SERVER=frankenphp

WORKDIR /app
COPY docker/backend/entrypoint.sh /usr/local/bin/folio-backend
COPY docker/backend/prepare-directories.sh /usr/local/bin/folio-prepare-directories
ENTRYPOINT ["sh", "/usr/local/bin/folio-backend"]
CMD ["php", "artisan", "octane:frankenphp", "--host=0.0.0.0", "--port=8000", "--admin-host=127.0.0.1", "--admin-port=2019", "--workers=auto", "--max-requests=500", "--log-level=info"]
EXPOSE 8000
USER ${USER}

FROM base AS dev
USER root
RUN install-php-extensions xdebug pdo_sqlite \
    && cp "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"
COPY docker/backend/php/development.ini /usr/local/etc/php/conf.d/zz-development.ini
USER ${USER}
ARG PHP_IDE_CONFIG_SERVER_NAME=folio
ENV PHP_IDE_CONFIG=serverName=${PHP_IDE_CONFIG_SERVER_NAME}

FROM base AS dependencies
COPY --chown=${USER_UID}:${USER_GID} src/backend/ ./
RUN <<'EOF'
    set -eu
    if [ ! -f composer.lock ]; then
        echo 'Run make init and commit src/backend/composer.lock before building production.' >&2
        exit 1
    fi
    composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader
    php artisan octane:install --server=frankenphp --no-interaction
EOF

FROM base AS production
USER root
RUN install-php-extensions opcache \
    && cp "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
COPY docker/backend/php/production.ini /usr/local/etc/php/conf.d/zz-production.ini
COPY --from=dependencies --chown=${USER_UID}:${USER_GID} /app /app
USER ${USER}
