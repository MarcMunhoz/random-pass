# Random Pass

Random Pass is a Vue-based password generator focused on usability and practical security defaults.
It generates strong passwords, lets users choose character composition rules, and refreshes output automatically.

## Features

- Generate passwords with configurable length and composition
- Toggle lowercase, uppercase, numbers, and special characters
- Define minimum quantity for numbers and special characters
- Dynamic minimum password length based on selected rules
- One-click copy with visual feedback
- Responsive Bootstrap UI

## Stack

- Vue 3 (Composition API)
- Vite 6
- Bootstrap 5
- Docker + Docker Compose

## Project Structure

- `app/`: Frontend source code
- `Dockerfile`: Development container image
- `docker-compose.yaml`: Local container orchestration
- `Makefile`: Convenience commands for local workflow

## Running Locally

### Option 1: Makefile (recommended)

```sh
make dev
```

This starts the stack in detached mode using Docker Compose.

### Option 2: Docker Compose directly

```sh
docker compose up -d
```

Application default URL:

```txt
http://localhost:1234
```

## Common Commands

Start existing containers:

```sh
make start
```

Stop containers:

```sh
make stop
```

Restart containers:

```sh
make restart
```

View logs:

```sh
make logs
```

Shutdown and cleanup:

```sh
make down
```

## Versioning and Release Notes

- Application version is defined in `app/package.json`
- Historical changes are documented in `CHANGELOG.md`
