# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:10-alpine

# Copy all local files into the image.
WORKDIR /home/node

COPY . .

# Install deps
RUN npm i -g typescript && \
    yarn install --ignore-scripts --non-interactive --frozen-lockfile && \
    yarn build

EXPOSE 5000
USER node

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL=warn \
    NODE_ENV=production \
    PORT=5000

# TODO ?
#RUN yarn remove [...] && yarn add express axios body-parser googleapis js-sha256 next nodemailer path http

CMD ["yarn","build:start"]
