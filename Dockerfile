FROM node:21-alpine3.19

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]