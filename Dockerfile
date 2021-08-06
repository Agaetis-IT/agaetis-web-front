# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:14-alpine

# Copy all local files into the image.
WORKDIR /app

COPY . .
RUN pwd
RUN ls -al
# Install deps
RUN npm i -g typescript && \
    yarn install --ignore-scripts --non-interactive --frozen-lockfile && \
    yarn build
RUN pwd
RUN ls -al
FROM node:14-alpine
WORKDIR /home/node
# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL=warn \
    NODE_ENV=production \
    NODE_PORT=5000

COPY --from=0 --chown=node:node /app/.env ./.env
COPY --from=0 --chown=node:node /app/.next ./.next
COPY --from=0 --chown=node:node /app/public ./public
COPY --from=0 --chown=node:node /app/package.json /app/yarn.lock /app/next.config.js ./
COPY --from=0 --chown=node:node /app/dist/server.js ./dist/server.js

RUN yarn --frozen-lockfile --non-interactive && \
    rm -rf .cache

USER node
EXPOSE 5000

# launch on port 5000
CMD ["yarn", "build:start"]