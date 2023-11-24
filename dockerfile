FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
COPY public ./public  

RUN npm install
RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]
