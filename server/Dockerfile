FROM node:11.15.0-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 80
ENTRYPOINT [ "node", "index.js" ]