![Version](https://img.shields.io/badge/version-0.7.0-0A7D34)
[![Netlify Status](https://api.netlify.com/api/v1/badges/8ec66615-d6ed-4808-be53-57ca2a515688/deploy-status?branch=main)](https://app.netlify.com/projects/random-pass/deploys)

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
- Vite 6.4.3
- Bootstrap 5
- Node.js 22 (Docker image)
- Docker + Docker Compose
- Cypress 15

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

Run end-to-end tests:

```sh
docker compose up -d app
docker compose run --rm cypress
```

Shutdown and cleanup:

```sh
make down
```

## Versioning and Release Notes

- Application version is defined in `app/package.json`
- Historical changes are documented in `CHANGELOG.md`
- Current release notes: `0.7.0` in `CHANGELOG.md`
- Changes merged after the last released version are tracked under `Unreleased` in `CHANGELOG.md` until the next version bump
