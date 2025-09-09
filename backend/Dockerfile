FROM node:20-alpine
WORKDIR /app
COPY package*.json tsconfig.json prisma wait-for-it.sh ./
RUN npm install
RUN npx prisma generate
COPY . .
RUN npx prisma migrate deploy
RUN apk add --no-cache bash
RUN chmod +x wait-for-it.sh
RUN tsc
RUN node dist/prisma/seed.js
ENV PORT=3001
EXPOSE 3001