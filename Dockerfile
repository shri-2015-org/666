FROM node:0.12.7-slim

ENV PORT 80

ADD ./ /root
WORKDIR /root

EXPOSE 80

RUN npm install -production
CMD npm run server
