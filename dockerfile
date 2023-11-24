FROM node:18-alpine as build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/package.json ./
COPY --from=build /app/.next ./.next

RUN npm install --only=production

EXPOSE 3000

CMD ["npm", "run", "dev"]