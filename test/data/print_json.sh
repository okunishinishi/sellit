#!/bin/bash

HERE=$(dirname $0)
PROJECT_ROOT=${HERE}/../..

SEED_DIR=${HERE}/seeds
JSON_DIR=${HERE}/json

tdprint=${PROJECT_ROOT}/node_modules/.bin/tdprint

${tdprint} json ${SEED_DIR} ${JSON_DIR}