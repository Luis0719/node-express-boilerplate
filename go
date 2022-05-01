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

function test {
  npm_run test
}

function lint {
  npm_run lint
}

function prettier {
  npm_run prettier
}
# End NPM functions

# DB actions
function npx_run {
  dc_exec npm $@
}

function migrate {
  npm_run migrate
}

function unmigrate {
  npm_run unmigrate
}

function seed {
  npm_run seed
}

function unseed {
  npm_run unseed
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
      migrate) migrate
      ;;
      unmigrate) unmigrate
      ;;
      seed) seed
      ;;
      unseed) unseed
      ;;
      create-migration) create-migration $3
      ;;
      create-model) create-model $3
      ;;
      create-seed) create-seed $3
      ;;
    esac
  ;;
  lint) lint
  ;;
  npm) npm ${@:2}
  ;;
  prettier) prettier
  ;;
  shell) shell
  ;;
  start) start
  ;;
  stop) stop
  ;;
  test) test
  ;;
  *)
    echo "Unable to execute $1"
  ;;
esac