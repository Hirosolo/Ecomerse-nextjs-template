#!/usr/bin/env sh

set -eu

if ! command -v pnpm >/dev/null 2>&1; then
  if command -v corepack >/dev/null 2>&1; then
    printf '%s\n' 'pnpm not found. Enabling via Corepack...'
    corepack enable
    corepack prepare pnpm@latest --activate
  fi
fi

if ! command -v pnpm >/dev/null 2>&1; then
  printf '%s\n' 'pnpm is not available. Install pnpm or enable Corepack, then rerun this script.' >&2
  exit 1
fi

printf '%s\n' 'Installing dependencies...'
pnpm install

if [ -f .env.example ] && [ ! -f .env ]; then
  cp .env.example .env
  printf '%s\n' 'Created .env from .env.example.'
fi

printf '%s\n' 'Setup complete.'
