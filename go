#!/bin/zsh

DB_IMAGE=db_dev
DEV_IMAGE=api_dev
DC=docker-compose

function dc_exec {
  echo "Running $@"
  $DC run $DEV_IMAGE $@
}

# Service functions
function runDb {
  $DC up $DB_IMAGE
}

function start {
  $DC up $DEV_IMAGE
}

function build {
  $DC build
}

function stop {
  $DC stop
  $DC down
}

function shell {
  dc_exec bash
}
# End Service functions

# NPM functions
function npm_exec {
  dc_exec npm $@
}

function npm_run {
  dc_exec npm run $@
}
# End NPM functions

# DB actions
function npx_run {
  dc_exec npx $@
}

function create-migration {
  npx_run migration:create --name $1
}

function create-model {
  npx_run model:create --name $1
}

function create-seed {
  npx_run seed:create --name $1
}
# End DB actions

case "$1" in
  build) build
  ;;
  db)
    case "$2" in
      run) runDb
      ;;
      migrate) npm_run migrate
      ;;
      unmigrate) npm_run unmigrate
      ;;
      seed) npm_run seed
      ;;
      unseed) npm_run unseed
      ;;
      create-migration) create-migration $3
      ;;
      create-model) create-model $3
      ;;
      create-seed) create-seed $3
      ;;
    esac
  ;;
  lint) npm_run lint
  ;;
  npm) npm ${@:2}
  ;;
  prettier) npm_run prettier
  ;;
  shell) shell
  ;;
  start) start
  ;;
  stop) stop
  ;;
  test) npm_run test
  ;;
  coverage) npm_run coverage
  ;;
  *)
    echo "Unable to execute $1"
  ;;
esac