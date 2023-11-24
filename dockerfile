FROM node:18-alpine as build

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY nest.config.js ./
COPY src ./src
COPY public ./public  

RUN npm install
RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

FROM node:18-alpine

WORKDIR /app
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

EXPOSE 3000

CMD ["npm", "run", "dev"]
