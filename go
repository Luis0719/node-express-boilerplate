#!/bin/zsh

DB_IMAGE=db_dev
DEV_IMAGE=api_dev
DC=docker-compose

function dc_exec {
  echo "Running $@"
  $DC run $DEV_IMAGE $@
}

function runDb {
  $DC up $DB_IMAGE
}

function start {
  $DC up $DEV_IMAGE
}

function build {
  $DC build
}

function npm_exec {
  dc_exec npm $@
}

function test {
  npm_exec run test
}

function lint {
  npm_exec run lint
}

function prettier {
  npm_exec run prettier
}

function stop {
  $DC stop
  $DC down
}

function shell {
  dc_exec shell
}

case "$1" in
  build) build
  ;;
  db) runDb
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