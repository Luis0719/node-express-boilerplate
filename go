#!/bin/zsh

function runDb {
  docker-compose up db_dev
}

function start {
  runDb
  npm run start
}


case "$1" in
  start) start
  ;;
  db) runDb
  ;;
  *)
    echo "Unable to execute $1"
  ;;
esac