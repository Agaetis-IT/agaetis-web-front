# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:10-alpine

# Copy all local files into the image.
WORKDIR app

COPY . .

# Install deps
RUN npm i -g typescript && \
    yarn install --ignore-scripts --non-interactive --frozen-lockfile --audit && \
    yarn build

FROM node:10-alpine
EXPOSE 5000
USER node
WORKDIR /home/node

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL=warn \
    NODE_ENV=production \
    PORT=5000

COPY --from=0 --chown=node:node app/dist/ dist
COPY --from=0 --chown=node:node app/src/.next .

CMD ["yarn","build:start"]
