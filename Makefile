.DEFAULT_GOAL := help

# Match development bind-mount ownership to the host user.
export LOCAL_UID := $(shell id -u)
export LOCAL_GID := $(shell id -g)

DEV := docker compose -f compose.yaml -f compose.dev.yaml
PROD := docker compose -f compose.yaml
ARGS ?=

.PHONY: help init up down logs shell backend-shell build lint test artisan migrate check octane-status octane-reload prod-up prod-down prod-logs prod-migrate prod-octane-status prod-octane-reload

help:
	@printf '%s\n' \
	  'make init         - initialize .env and install development dependencies' \
	  'make up           - build and start the development stack at http://127.0.0.1:8080' \
	  'make down         - stop development containers and keep persistent data' \
	  'make logs         - follow development logs' \
	  'make shell        - open the frontend shell' \
	  'make backend-shell - open the backend shell' \
	  'make build        - typecheck and build the frontend' \
	  'make lint         - lint the frontend' \
	  'make test         - run Laravel feature tests' \
	  'make artisan ARGS="route:list" - run an Artisan command' \
	  'make migrate      - run development migrations' \
	  'make octane-status / make octane-reload - inspect or reload development workers' \
	  'make check        - validate both Compose configurations' \
	  'make prod-up      - build and start production (SERVICE_CADDY_HTTPS_PORT)' \
	  'make prod-down    - stop production containers and keep persistent data' \
	  'make prod-logs    - follow production logs' \
	  'make prod-migrate - explicitly run production migrations' \
	  'make prod-octane-status / make prod-octane-reload - inspect or reload production workers'

init:
	$(DEV) build backend frontend
	$(DEV) run --rm --no-deps --entrypoint php --volume "$(CURDIR):/project" backend /project/docker/scripts/init-env.php
	$(DEV) run --rm --no-deps --user root backend sh /usr/local/bin/folio-prepare-directories development
	$(DEV) run --rm --no-deps backend composer install --no-interaction --prefer-dist
	$(DEV) run --rm --no-deps backend php artisan octane:install --server=frankenphp --no-interaction
	$(DEV) run --rm --no-deps frontend sh scripts/install.sh

up:
	$(DEV) up -d --build

down:
	$(DEV) down

logs:
	$(DEV) logs -f

shell:
	$(DEV) exec frontend sh

backend-shell:
	$(DEV) exec backend sh

build:
	$(DEV) run --rm --no-deps frontend sh -c 'sh scripts/install.sh && npm run build'

lint:
	$(DEV) run --rm --no-deps frontend sh -c 'sh scripts/install.sh && npm run lint'

test:
	$(DEV) run --rm --no-deps backend php vendor/bin/phpunit

artisan:
	$(DEV) exec backend php artisan $(ARGS)

migrate:
	$(DEV) exec backend php artisan migrate

octane-status:
	$(DEV) exec backend php artisan octane:status --server=frankenphp

octane-reload:
	$(DEV) exec backend php artisan octane:reload --server=frankenphp

check:
	$(PROD) config --quiet
	$(DEV) config --quiet

prod-up:
	$(PROD) build
	$(PROD) run --rm --no-deps --user root backend sh /usr/local/bin/folio-prepare-directories
	$(PROD) up -d

prod-down:
	$(PROD) down

prod-logs:
	$(PROD) logs -f

prod-migrate:
	$(PROD) exec backend php artisan migrate --force

prod-octane-status:
	$(PROD) exec backend php artisan octane:status --server=frankenphp

prod-octane-reload:
	$(PROD) exec backend php artisan octane:reload --server=frankenphp
