
# Pull base image.
FROM ubuntu

# Install MongoDB.
RUN \
  apt-get update && \
  apt-get install -y mongodb && \
  rm -rf /var/lib/apt/lists/*

# Define mountable directories.
VOLUME ["/data/db", "/data/logs"]

