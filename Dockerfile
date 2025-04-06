FROM node:22-slim

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install

COPY . .

RUN pnpm build

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=${PORT}
ENV BASE_URL=${BASE_URL}
ENV API_BASE_URL=${API_BASE_URL}

EXPOSE ${PORT}

CMD ["pnpm", "start"]