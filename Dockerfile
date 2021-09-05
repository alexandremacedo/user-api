FROM node:12

WORKDIR /usr/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

COPY ormconfig.docker.json ./ormconfig.json

EXPOSE 3333

CMD ["npm", "start"]