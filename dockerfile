FROM node:18-alpine as build

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
COPY public ./public  

RUN npm install
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/out /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
