FROM node:20-alpine
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml* ./
RUN pnpm i
COPY . .
RUN pnpm build
ENV NODE_ENV production
EXPOSE 3000
CMD ["pnpm", "start"]