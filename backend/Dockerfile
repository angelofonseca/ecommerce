FROM node:20-alpine
WORKDIR /app
COPY package*.json prisma ./
RUN npm install
RUN npx prisma generate
COPY . .
ENV PORT=8080
EXPOSE 8080
CMD [ "npm", "run", "dev" ]