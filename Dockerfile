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


# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL=warn \
    NODE_ENV=production \
    PORT=5000

# TODO ?

RUN yarn remove @bugsnag/js @bugsnag/plugin-react @fullhuman/postcss-purgecss @types/nprogress @types/react-google-recaptcha @types/yup @zeit/next-css @zeit/next-typescript autoprefixer babel-plugin-transform-define clsx dotenv formik i18next i18next-browser-languagedetector next next-images next-purgecss next-routes normalize.css nprogress react-ga react-google-recaptcha react-i18next tailwindcss yup   &&  yarn add express axios body-parser googleapis js-sha256 next nodemailer path http
CMD ["yarn","build:start"]

USER node
