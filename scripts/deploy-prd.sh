#!/bin/bash

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
print_success() { echo -e "${GREEN}✅ $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }

command_exists() { command -v "$1" >/dev/null 2>&1; }

load_deploy_config() {
    local script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    source "$script_dir/utils/load-env.sh"
    print_success "Environment loaded"
}

get_version() {
    if [ -n "$VERSION" ]; then
        echo "$VERSION"
    elif command_exists git && [ -d ".git" ]; then
        local git_tag=$(git describe --tags --exact-match 2>/dev/null || echo "")
        if [ -n "$git_tag" ]; then
            echo "${git_tag#v}"
        else
            print_error "No VERSION specified and not on a Git tag"
            exit 1
        fi
    else
        print_error "VERSION not set and Git not available"
        exit 1
    fi
}

update_package_version() {
    local new_version=$1
    if command_exists jq; then
        jq ".version = \"$new_version\"" package.json > package.json.tmp && mv package.json.tmp package.json
    fi
    print_success "Version set to $new_version"
}

load_deploy_config

if [ -z "$PROJECT_ID" ]; then
    print_error "PROJECT_ID is not set"
    exit 1
fi

REGION="${REGION:-us-west1}"
SERVICE_NAME="${SERVICE_NAME:-task-flow-app-prd}"
SERVICE_PORT="${SERVICE_PORT:-8080}"
SERVICE_MEMORY="${SERVICE_MEMORY:-1Gi}"
SERVICE_CPU="${SERVICE_CPU:-1000m}"
SERVICE_MAX_INSTANCES="${SERVICE_MAX_INSTANCES:-100}"
SERVICE_MIN_INSTANCES="${SERVICE_MIN_INSTANCES:-0}"

VERSION=$(get_version)
LABEL_VERSION=$(echo "$VERSION" | sed 's/\./-/g')

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  🚀 Task Flow App - Production Deployment"
echo "═══════════════════════════════════════════════════════"
echo ""

if ! command_exists npm; then
    print_error "npm is not installed"
    exit 1
fi

if ! command_exists gcloud; then
    print_error "gcloud CLI is not installed"
    exit 1
fi

if [ -z "$SERVICE_ACCOUNT_KEY_PATH" ]; then
    print_error "SERVICE_ACCOUNT_KEY_PATH not set"
    exit 1
fi

if [ ! -f "$SERVICE_ACCOUNT_KEY_PATH" ]; then
    print_error "Service account key file not found: $SERVICE_ACCOUNT_KEY_PATH"
    exit 1
fi

print_info "Authenticating with Service Account..."
gcloud auth activate-service-account --key-file="$SERVICE_ACCOUNT_KEY_PATH" --quiet

print_info "Setting project to $PROJECT_ID..."
gcloud config set project "$PROJECT_ID" --quiet

print_info "Setting application version..."
update_package_version "$VERSION"

print_info "Installing dependencies..."
npm ci

print_info "Building application..."
npm run build

if [ ! -d "dist" ] || [ -z "$(ls -A dist 2>/dev/null)" ]; then
    print_error "dist/ directory is empty"
    exit 1
fi

print_info "Deploying with Cloud Build..."

ENV_VARS_ARRAY=("NODE_ENV=production")
if [ -n "$GEMINI_API_KEY" ]; then
    ENV_VARS_ARRAY+=("GEMINI_API_KEY=$GEMINI_API_KEY")
fi
if [ -n "$VITE_GOOGLE_CLIENT_ID" ]; then
    ENV_VARS_ARRAY+=("VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID")
fi

ENV_VARS=$(IFS=,; echo "${ENV_VARS_ARRAY[*]}")

gcloud run deploy "$SERVICE_NAME" \
    --source . \
    --region "$REGION" \
    --project "$PROJECT_ID" \
    --platform managed \
    --port "$SERVICE_PORT" \
    --memory "$SERVICE_MEMORY" \
    --cpu "$SERVICE_CPU" \
    --max-instances "$SERVICE_MAX_INSTANCES" \
    --min-instances "$SERVICE_MIN_INSTANCES" \
    --set-env-vars "$ENV_VARS" \
    --labels "version=v$LABEL_VERSION,deployed-by=deploy-script,environment=production" \
    --tag "$VERSION" \
    --allow-unauthenticated \
    --quiet

if SERVICE_URL=$(gcloud run services describe "$SERVICE_NAME" --region "$REGION" --project "$PROJECT_ID" --format='value(status.url)' 2>/dev/null); then
    echo ""
    print_success "Deployment completed!"
    print_info "Service URL: ${GREEN}$SERVICE_URL${NC}"
    print_info "Version: ${GREEN}v$VERSION${NC}"
fi

print_success "Happy coding!"
echo ""
