#!/bin/bash

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_FILE="$PROJECT_ROOT/.env"

if [ -f "$ENV_FILE" ]; then
  source "$ENV_FILE"
fi

PROJECT_ID="${PROJECT_ID:-}"
REGION="${REGION:-us-central1}"
APP_NAME="task-flow-app"

if [ -z "$PROJECT_ID" ]; then
  echo "PROJECT_ID not defined. Skipping GCP setup."
  exit 0
fi

echo "Configuring GCP for $PROJECT_ID..."

gcloud config set project "$PROJECT_ID" --quiet

echo "Enabling APIs..."
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com iam.googleapis.com cloudresourcemanager.googleapis.com secretmanager.googleapis.com logging.googleapis.com --quiet

REGISTRY_NAME="${APP_NAME}"

echo "Creating Artifact Registry..."
gcloud artifacts repositories create "$REGISTRY_NAME" --repository-format=docker --location="$REGION" --description="Docker repository for $APP_NAME" --quiet 2>/dev/null || echo "Artifact Registry already exists"

echo "Creating Service Account..."
SA_NAME="${APP_NAME}-deploy"
SA_EMAIL="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

gcloud iam service-accounts create "$SA_NAME" --display-name="$APP_NAME Deploy SA" --quiet 2>/dev/null || echo "SA already exists"

echo "Assigning roles..."
gcloud projects add-iam-policy-binding "$PROJECT_ID" --member="serviceAccount:${SA_EMAIL}" --role="roles/run.admin" --quiet
gcloud projects add-iam-policy-binding "$PROJECT_ID" --member="serviceAccount:${SA_EMAIL}" --role="roles/cloudbuild.builds.editor" --quiet
gcloud projects add-iam-policy-binding "$PROJECT_ID" --member="serviceAccount:${SA_EMAIL}" --role="roles/artifactregistry.writer" --quiet
gcloud projects add-iam-policy-binding "$PROJECT_ID" --member="serviceAccount:${SA_EMAIL}" --role="roles/storage.admin" --quiet
gcloud projects add-iam-policy-binding "$PROJECT_ID" --member="serviceAccount:${SA_EMAIL}" --role="roles/iam.serviceAccountUser" --quiet
gcloud projects add-iam-policy-binding "$PROJECT_ID" --member="serviceAccount:${SA_EMAIL}" --role="roles/logging.logWriter" --quiet

echo "Generating Service Account key..."
KEY_FILE="$PROJECT_ROOT/service-account-key.json"
gcloud iam service-accounts keys create "$KEY_FILE" --iam-account="$SA_EMAIL" --quiet

echo "GCP Setup complete!"
echo "Key saved at: $KEY_FILE"