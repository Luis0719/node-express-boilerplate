#!/bin/bash -e
echo "Running as $APP_ENV"

set -o pipefail
exec "$@"
