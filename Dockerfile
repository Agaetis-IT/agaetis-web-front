# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:10-alpine

# Copy all local files into the image.
WORKDIR app
COPY . .

# Install deps
RUN yarn --non-interactive --frozen-lockfile --audit && \
    yarn test && \
    yarn build

FROM node:10-alpine
EXPOSE 5000
USER node
WORKDIR /home/node

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL=warn \
    NODE_ENV=production

COPY --from=0 --chown=node:node app/src/.next src/.next
COPY --from=0 --chown=node:node app/package.json app/yarn.lock app/next.config.js ./

RUN yarn --frozen-lockfile --non-interactive && \
    rm -rf .cache

# launch on port 5000
CMD ["yarn", "build:start", "-p", "5000"]
