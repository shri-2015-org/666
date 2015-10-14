FROM anonym/mongodb

# Install NodeJS.
RUN \
  apt-get update && \
  apt-get install -y nodejs && \
  apt-get install -y nodejs-legacy && \
  apt-get install -y npm && \
  rm -rf /var/lib/apt/lists/*

ADD ./data /data
WORKDIR /data

RUN npm install

