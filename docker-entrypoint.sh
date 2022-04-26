#!/bin/bash -e
echo "APP_ENV=$APP_ENV"
echo "NODE_ENV=$NODE_ENV"

set -o pipefail
exec "$@"
