FROM node:18-alpine as build

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./ 
COPY src ./src 

RUN npm install
RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/package.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/tsconfig.json ./ 
COPY --from=build /app/src ./src 

RUN npm install --only=production

EXPOSE 3000

CMD ["npm", "run", "dev"]
