# Folio

A React + TypeScript portfolio UI preview built with Radix Themes and Vite.
Docker Compose runs a single `frontend` service on Node.js 24 LTS using the
official `node:24-bookworm-slim` image.

## Requirements

- Docker with a running Docker Engine and Docker Compose v2 or later.
- Make.
- Internet access to download the Docker image and npm packages.

You do not need Node.js or npm installed on your computer when using Docker.

## Getting started

Run these commands from the project root:

```sh
cp -n .env.example .env
make up
make logs
```

Wait for Vite to report that it is ready, then open <http://127.0.0.1:5173>.
Use the sidebar to switch between Portfolio and Transactions. Both pages use
static demo data; filters, exports, and transaction actions are unavailable.
Press `Ctrl+C` to stop following logs; the container will keep running.

`.env` contains local Docker Compose settings and is ignored by Git.
`.env.example` is tracked as a configuration template. If `.env` already exists,
the copy command preserves it; add any missing variables manually.

| Variable | Default | Purpose |
| --- | --- | --- |
| `COMPOSE_PROJECT_NAME` | `folio` | Project name and prefix for container and network names |
| `COMPOSE_FILE` | `compose.yaml` | Compose configuration files; currently a single file |
| `COMPOSE_PROFILES` | Empty | Profile selection: `frontend`, or `*` for all profiles |
| `SERVICE_FRONTEND_PORT` | `5173` | Frontend port on the host |

The Makefile explicitly enables the `frontend` profile, so `make up` and
`make down` work even when `COMPOSE_PROFILES` is empty. To use Compose directly:

```sh
docker compose --profile frontend up -d
docker compose --profile frontend down
```

See the [Compose profiles documentation](https://docs.docker.com/compose/how-tos/profiles/)
for details on selecting service groups.

Startup uses `npm ci` when `src/frontend/package-lock.json` matches the declared
dependencies for reproducible installations. If the lock file is missing or the
declared dependencies have changed, `npm install` updates it,
resolving React and React DOM from the stable `latest` channel.
Keep the lock file in version control.

The source directory `src/frontend/` is mounted into the container. Changes to
`src/frontend/src/App.tsx` appear automatically in the browser through Vite Fast Refresh.
Dependencies are installed into `src/frontend/node_modules/` through the same
bind mount as the source code. This directory is ignored by Git.
The `${COMPOSE_PROJECT_NAME}-frontend` container connects to a dedicated bridge
network with the same name. The source mount, network, and port mapping are
explicitly configured in `compose.yaml`.

The published port is only accessible on the local computer. If port 5173 is
already in use, set a different port in `.env`, such as `SERVICE_FRONTEND_PORT=5174`,
run `make up`, and open <http://127.0.0.1:5174>.
Vite always listens on port 5173 inside the container.

## Commands

| Command | Action |
| --- | --- |
| `make help` | Show available commands |
| `make up` | Start the application in the background |
| `make down` | Stop and remove the container; source files and dependencies remain on the host |
| `make logs` | Follow application logs |
| `make shell` | Open a shell in the running container |
| `make build` | Install dependencies, check TypeScript, and build into `src/frontend/dist/` |
| `make lint` | Install dependencies and check the code with Oxlint |

Build and lint commands run in a temporary container and work even when the
frontend is stopped. They reinstall dependencies in `src/frontend/node_modules/`, so stop
the development server with `make down` before running them.

To add a dependency, run `make shell`, then run `npm install <package>` inside
the container. Commit changes to `package.json` and `package-lock.json` together.

To get Node.js 24 image updates within the LTS release line:

```sh
docker compose --profile frontend pull frontend
make up
```

## Project structure

```text
compose.yaml          # Single frontend service
.env.example          # Example local Docker Compose settings
Makefile              # Development commands
LICENSE               # Apache License 2.0
src/frontend/
  package.json        # Dependencies and npm scripts
  scripts/install.sh  # Initial installation and subsequent npm ci runs
  index.html          # HTML entry point
  src/                # React components and styles
  vite.config.ts      # Vite and React Fast Refresh configuration
  tsconfig*.json      # TypeScript configuration
```

## License

The project code is licensed under [Apache License 2.0](LICENSE).
Dependencies retain their own licenses.
