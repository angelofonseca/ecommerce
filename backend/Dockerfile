FROM node:20-alpine
WORKDIR /app
COPY package*.json tsconfig.json prisma wait-for-it.sh ./
RUN npm install
COPY . .
RUN apk add --no-cache bash
RUN chmod +x wait-for-it.sh
ENV PORT=3001
EXPOSE 3001