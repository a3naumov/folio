.DEFAULT_GOAL := help

COMPOSE := docker compose --profile frontend

.PHONY: help up down logs shell build lint

help:
	@printf '%s\n' \
	  'make up     — start frontend (SERVICE_FRONTEND_PORT, default: 5173)' \
	  'make down   — stop and remove the container' \
	  'make logs   — follow frontend logs' \
	  'make shell  — open sh in the running container' \
	  'make build  — check TypeScript and build frontend' \
	  'make lint   — lint the source code'

up:
	$(COMPOSE) up -d frontend

down:
	$(COMPOSE) down

logs:
	$(COMPOSE) logs -f frontend

shell:
	$(COMPOSE) exec frontend sh

build:
	$(COMPOSE) run --rm --no-deps frontend sh -c 'sh scripts/install.sh && npm run build'

lint:
	$(COMPOSE) run --rm --no-deps frontend sh -c 'sh scripts/install.sh && npm run lint'
