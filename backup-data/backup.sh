# Exit immediately if a command exits with a non-zero status.
set -e

# Backup

echo "Start Backup mongodb Job: $(date)"

BACKUP_TIME=$(date +%d%m%Y_%H%M%S)
DUMP_DIR="/mongodb-backup"
TEMP_DUMP="dump"

mkdir -p $TEMP_DUMP

# If we only wont to dump a mongo database of a specific application
if [ ! -z "$DB_NAME" ]
then
	echo "Backuping database $DB_NAME ...."
	mkdir -p $TEMP_DUMP/$DB_NAME
	FILE="$DUMP_DIR/$DB_NAME-$BACKUP_TIME.tar.gz"
	mongodump --host $MONGO_HOST --port $MONGO_PORT --db $DB_NAME --out $TEMP_DUMP/$DB_NAME
	tar -zcvf $FILE $TEMP_DUMP/$DB_NAME/
	echo "database $DB_NAME backup with success!"
else
	# else dump all the mongo db 
	echo "Backuping all the databases ..."

	mongodump --host $MONGO_HOST --port $MONGO_PORT --out $TEMP_DUMP
	FILE="$DUMP_DIR/alldbse-$BACKUP_TIME.tar.gz"
	tar -zcvf $FILE $TEMP_DUMP/
	echo "All the databases backup with success!"
fi

rm -rf $TEMP_DUMP/

echo "End Backup mongodb Job: $(date)"