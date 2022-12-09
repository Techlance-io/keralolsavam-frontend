FROM node:18-slim

WORKDIR /app
EXPOSE 80

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]