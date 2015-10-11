FROM node:0.12.7-slim

ENV PORT 80
ENV PORT 3000
EXPOSE 80 3000

ADD ./build /root
WORKDIR /root

RUN npm install --production
CMD npm run start
