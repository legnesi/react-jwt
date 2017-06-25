FROM node:latest

ENV WORKDIR /usr/src/app

RUN mkdir -p $WORKDIR/client/src
RUN mkdir -p $WORKDIR/client/dist/js
RUN mkdir -p $WORKDIR/server

WORKDIR $WORKDIR

#Copy files
COPY package.json $WORKDIR/
COPY index.js $WORKDIR/
COPY webpack.config.js $WORKDIR/
COPY server/ $WORKDIR/server/
COPY client/src/ $WORKDIR/client/src/

# install node dependencies
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]

