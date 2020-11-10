# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:10-alpine

# Copy all local files into the image.
WORKDIR /app

COPY . .

# Install deps
RUN npm i -g typescript && \
    yarn install --ignore-scripts --non-interactive --frozen-lockfile && \
    yarn build

FROM node:10-alpine
WORKDIR /home/node
# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL=warn \
    NODE_ENV=production \
    NODE_PORT=5000

COPY --from=0 --chown=node:node /app/src/.next src/.next
COPY --from=0 --chown=node:node /app/src/public src/public
COPY --from=0 --chown=node:node /app/dist/server.js app/package.json app/yarn.lock app/next.config.js ./
COPY --from=0 --chown=node:node  /app/robots.txt /app/google80ae36db41235209.html /app/symbole-agaetis-p164-rgb.png  ./

RUN yarn --frozen-lockfile --non-interactive && \
    rm -rf .cache

USER node
EXPOSE 5000

# launch on port 5000
CMD ["yarn", "build:start"]