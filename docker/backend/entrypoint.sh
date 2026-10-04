#!/bin/sh
set -eu

if [ "${1:-}" = php ] && [ "${2:-}" = artisan ] && \
    { [ "${3:-}" = octane:start ] || [ "${3:-}" = octane:frankenphp ]; }; then
    : "${APP_KEY:?Run make init to generate APP_KEY.}"
    if [ ! -f vendor/autoload.php ]; then
        echo 'Backend dependencies are missing. Run make init.' >&2
        exit 1
    fi

    mkdir -p storage/app/private storage/app/public storage/framework/cache/data \
        storage/framework/sessions storage/framework/views storage/logs bootstrap/cache
    if [ ! -w storage ] || [ ! -w bootstrap/cache ]; then
        echo 'Laravel directories are not writable. Run make init or make prod-up to prepare permissions.' >&2
        exit 1
    fi

    # Process state belongs to this container, not the persistent storage volume.
    rm -f /tmp/folio-octane-server-state.json
    if [ "${APP_ENV:-production}" = production ]; then
        php artisan config:cache
        php artisan route:cache
        php artisan view:cache
    else
        php artisan config:clear
    fi
fi

exec "$@"
