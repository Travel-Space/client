FROM node:18-alpine AS build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

RUN apk add --no-cache nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN cat /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["sh", "-c", "nginx && npm run dev"]
