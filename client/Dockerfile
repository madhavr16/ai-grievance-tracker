FROM node:18
WORKDIR /app
COPY . .
RUN npm install && npm run build
RUN npm install serve
EXPOSE 3000
CMD ["npx", "serve", "-s", "3000"]
