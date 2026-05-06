Param(
  [switch]$SkipEnvCopy
)

$ErrorActionPreference = 'Stop'

function Write-Info {
  param([string]$Message)
  Write-Host $Message
}

if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
  if (Get-Command corepack -ErrorAction SilentlyContinue) {
    Write-Info 'pnpm not found. Enabling via Corepack...'
    corepack enable | Out-Null
    corepack prepare pnpm@latest --activate | Out-Null
  }
}

if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
  throw 'pnpm is not available. Install pnpm or enable Corepack, then rerun this script.'
}

Write-Info 'Installing dependencies...'
pnpm install

if (-not $SkipEnvCopy -and (Test-Path '.env.example') -and -not (Test-Path '.env')) {
  Copy-Item '.env.example' '.env'
  Write-Info 'Created .env from .env.example.'
}

Write-Info 'Setup complete.'
