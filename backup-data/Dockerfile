FROM mongo:3.4

RUN apt-get update && \
    apt-get install -y cron && \
    apt-get clean && rm -rf /var/lib/apt/lists/*


ADD backup.sh /backup.sh
ADD start-backup.sh /start-backup.sh

RUN chmod +x /start-backup.sh && chmod +x /backup.sh

WORKDIR mongodb-backup

ENTRYPOINT ["/start-backup.sh"]
CMD [""]