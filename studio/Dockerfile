# Bundle architecture-independent JavaScript natively; emulated esbuild can crash.
FROM --platform=$BUILDPLATFORM node:22-bookworm-slim AS studio-build
WORKDIR /opt/studio
COPY package*.json ./
RUN npm ci --no-audit --no-fund
COPY src ./src
COPY vendor ./vendor
COPY scripts ./scripts
COPY tsconfig.json ./
RUN npm run build

FROM node:22-bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends git ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /opt/studio
COPY package*.json ./
RUN npm ci --cache /opt/npm-cache --no-audit --no-fund && chown -R node:node /opt/studio /opt/npm-cache
COPY .studio-image/site /opt/site
# travedise: the site uses pnpm (version pinned by packageManager in its package.json).
RUN npm install -g --no-audit --no-fund pnpm@11.24.0 && mkdir -p /opt/pnpm-store
RUN if [ -f /opt/site/pnpm-lock.yaml ]; then cd /opt/site && pnpm install --frozen-lockfile --store-dir /opt/pnpm-store; \
    elif [ -f /opt/site/package-lock.json ]; then cd /opt/site && npm ci --cache /opt/npm-cache --no-audit --no-fund; fi \
    && chown -R node:node /opt/site /opt/npm-cache /opt/pnpm-store
COPY src ./src
COPY vendor ./vendor
COPY scripts ./scripts
COPY tsconfig.json ./
COPY --from=studio-build /opt/studio/dist ./dist
RUN mkdir /workspace && chown node:node /workspace
USER node
EXPOSE 4350
ENV ASTRO_TELEMETRY_DISABLED=1
ENV NPM_CONFIG_UPDATE_NOTIFIER=false
CMD ["node", "dist/container.mjs"]
