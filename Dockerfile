ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-slim AS base

WORKDIR /src

FROM base AS build

RUN npm i -g pnpm

COPY --link package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY --link . .

RUN pnpm build

FROM base

ENV NODE_ENV=production
ENV API_BASE_URL=${API_BASE_URL}
ENV DISCORD_REPORT_URL=${DISCORD_REPORT_URL}

COPY --from=build /src/.output /src/.output

EXPOSE 3000

CMD [ "node", ".output/server/index.mjs" ]