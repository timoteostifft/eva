FROM node:18.20.4

WORKDIR /app/frontend

COPY package*.json ./

RUN npm install -g pnpm

RUN pnpm install

COPY . ./

EXPOSE 5173

CMD ["pnpm", "run", "dev", "--host", "0.0.0.0"]