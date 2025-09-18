FROM node:20-alpine
WORKDIR /app
COPY package*.json prisma ./
RUN npm install
RUN npx prisma generate
COPY . .
ENV PORT=3001
EXPOSE 3001
CMD [ "npm", "run", "db:start" ]