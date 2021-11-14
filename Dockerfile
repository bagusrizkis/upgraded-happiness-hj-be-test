FROM node:16.10.0
WORKDIR /usr/servercode
COPY . .
RUN npm install
CMD [ "npm", 'run', "start" ]