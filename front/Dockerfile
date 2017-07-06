###
### NPM INSTALL LAYER
##################################
FROM node:latest as NODE_INSTALL
WORKDIR /usr/node/modules
#Copy packages.json file
COPY package.json .
RUN npm install

###
### WEBPACK BUILD LAYER
##################################
FROM node:latest as WEBPACK
WORKDIR /usr/webpack
COPY webpack.config.js .
COPY client/src ./client/src
COPY package.json .
COPY --from=NODE_INSTALL /usr/node/modules/node_modules ./node_modules
RUN npm run bundle

###
### REMOVE DEV DEPENDENCIES LAYER
##################################

FROM node:latest as CLEAN_DEV_DEPENDENCIES
WORKDIR /usr/clean_dev_dependencies
COPY package.json .
COPY --from=WEBPACK /usr/webpack/client/dist/js ./client/dist/js
COPY --from=WEBPACK /usr/webpack/node_modules ./node_modules
RUN npm uninstall babel-core babel-loader babel-preset-es2015 babel-preset-react webpack webpack-shell-plugin -D

###
### BUILD IMAGE LAYER
##################################
FROM node:latest
WORKDIR /usr/app

#COPY package.json .
COPY index.js .
COPY server ./server
COPY --from=CLEAN_DEV_DEPENDENCIES /usr/clean_dev_dependencies/package.json ./package.json
COPY --from=CLEAN_DEV_DEPENDENCIES /usr/clean_dev_dependencies/node_modules ./node_modules
COPY --from=CLEAN_DEV_DEPENDENCIES /usr/clean_dev_dependencies/client/dist/js ./client/dist/js

EXPOSE 3000

CMD ["npm", "start"]