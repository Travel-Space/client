# Build stage
FROM node:18-alpine as build

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
COPY public ./public  

ARG NEXT_PUBLIC_GOOGLE_MAP_KEY
ARG NEXT_PUBLIC_SOCKET_CHAT_URI
ARG NEXT_PUBLIC_SOCKET_NOTIFICATION_URI
ARG NEXT_PUBLIC_COUNTRY_API_KEY
ARG GOOGLE_CALLBACK_URL

ENV NEXT_PUBLIC_GOOGLE_MAP_KEY=$NEXT_PUBLIC_GOOGLE_MAP_KEY
ENV NEXT_PUBLIC_SOCKET_CHAT_URI=$NEXT_PUBLIC_SOCKET_CHAT_URI
ENV NEXT_PUBLIC_SOCKET_NOTIFICATION_URI=$NEXT_PUBLIC_SOCKET_NOTIFICATION_URI
ENV NEXT_PUBLIC_COUNTRY_API_KEY=$NEXT_PUBLIC_COUNTRY_API_KEY
ENV GOOGLE_CALLBACK_URL=$GOOGLE_CALLBACK_URL

RUN npm install
RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/package.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/tsconfig.json ./
COPY --from=build /app/public ./public  
COPY --from=build /app/src ./src

RUN npm install --only=production

EXPOSE 3000

CMD ["npm", "run", "start"]
