#!/bin/bash

set -e

CRON_SCHEDULE=${CRON_SCHEDULE:-* * * * *}
export MONGO_HOST=${MONGO_HOST:-mongo}
export MONGO_PORT=${MONGO_PORT:-27017}
export DB_NAME=${DB_NAME}

LOGFIFO='/var/log/cron.fifo'
if [[ ! -e "$LOGFIFO" ]]; then
	mkfifo "$LOGFIFO"
fi

CRON_ENV="MONGO_HOST='$MONGO_HOST'"
CRON_ENV="$CRON_ENV\nMONGO_PORT='$MONGO_PORT'"
CRON_ENV="$CRON_ENV\nDB_NAME='$DB_NAME'"
echo -e "$CRON_ENV\n$CRON_SCHEDULE /backup.sh > $LOGFIFO 2>&1" | crontab -
crontab -l
cron

tail -f "$LOGFIFO"