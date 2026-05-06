# Project Setup

Minimal instructions to set up this Next.js + pnpm project from scratch.

## Requirements

- Node.js 18.x or newer (LTS recommended)
- Git
- Optional: nvm / nvm-windows for Node version management

pnpm is used by this repo. You can use Corepack (bundled with Node >=16.9) or install `pnpm` globally.

## Quick Start (Windows PowerShell)

1. Clone the repo:

```powershell
git clone <repo-url> next-merce
cd next-merce
```

2. Ensure Node is installed and enable Corepack (recommended):

```powershell
# enable corepack and activate latest pnpm
corepack enable
corepack prepare pnpm@latest --activate
```

3. Run the setup script (PowerShell):

```powershell
.\scripts\setup.ps1
```

4. Start the dev server:

```powershell
pnpm dev
```

## Quick Start (macOS / Linux)

1. Clone and enter repo:

```bash
git clone <repo-url> next-merce
cd next-merce
```

2. Enable Corepack or install pnpm:

```bash
corepack enable
corepack prepare pnpm@latest --activate
# or: npm i -g pnpm
```

3. Run the shell setup script:

```bash
./scripts/setup.sh
```

4. Start dev server:

```bash
pnpm dev
```

## What the scripts do

- Ensure `pnpm` is available (via Corepack or fallback guidance)
- Run `pnpm install` to install dependencies
- Copy `.env.example` to `.env` if present and `.env` does not already exist

## Notes

- If you need a specific Node version, use `nvm` or `nvm-windows` to install and select it before running the scripts.
- If the project requires additional services (databases, Redis), consult the repo README or add local services before running the app.

If you want, I can also add `package.json` scripts or a Makefile to wrap these commands.
