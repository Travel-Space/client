FROM node:18-alpine as build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/.next /usr/share/nginx/html

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]