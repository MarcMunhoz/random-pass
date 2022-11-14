FROM node:16-alpine

ARG APP_PATH=/app

ENV PORT=1234

COPY ["package.json", "yarn.lock", "./"]

RUN yarn global add vite \
  && yarn create vite \
  && yarn \
  && rm -rf /var/cache/apk/* /tmp/* /var/tmp/* /usr/share/man

WORKDIR ${APP_PATH}

VOLUME ${APP_PATH}

ENTRYPOINT [ "yarn", "dev" ]
