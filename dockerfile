# 빌드 스테이지
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

# 실행 스테이지
FROM nginx:stable-alpine

# Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 빌드 결과 복사
COPY --from=build /app/.next /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]