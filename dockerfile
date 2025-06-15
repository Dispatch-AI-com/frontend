FROM node:20-alpine

# 👉 注入 Jenkins 中传入的环境变量（前端后端 URL）
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

# 👉 使用 root 权限安装工具
USER root

# ✅ 安装 Docker CLI 和常用工具（重点）
RUN apk update && apk add --no-cache \
  docker-cli \
  bash \
  curl \
  git \
  python3 \
  py3-pip

# ✅ 安装 pnpm
RUN npm install -g pnpm

# 👉 设置工作目录
WORKDIR /app

# 👉 安装依赖
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

# 👉 拷贝代码并构建
COPY . .
RUN pnpm build

# 👉 设置生产环境变量
ENV NODE_ENV=production

# ✅ 设置默认启动命令：自动运行前端服务
CMD ["pnpm", "start"]

