FROM node:18-alpine as build

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
COPY public ./public  

RUN npm install
RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV production

ENV NEXT_PUBLIC_GOOGLE_MAP_KEY=AIzaSyD59CDhyuIwbEA1_xAewLGJab-z2SXVMWo
ENV NEXT_PUBLIC_SOCKET_CHAT_URI=https://travelspace.world/ws-chat
ENV NEXT_PUBLIC_SOCKET_NOTIFICATION_URI=https://travelspace.world/ws-notifications
ENV NEXT_PUBLIC_COUNTRY_API_KEY=sCpHMLPz%2FblcixtApQnF3nZPFJsIZH3AbF4f67%2BSbTTtFvQzHvZFufYkHaVZawgvV2%2B%2BnAyP7uiiO7HTnQNXoQ%3D%3D

COPY --from=build /app/package.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/src ./src
COPY .env.production .

RUN npm install --only=production

EXPOSE 3000

CMD ["npm", "run", "start"]