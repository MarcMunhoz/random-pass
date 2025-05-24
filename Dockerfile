FROM node:22-alpine

ARG APP_PATH=/app

ENV PORT=1234

COPY ["./app/package.json", "./app/yarn.lock", "./"]

RUN yarn global add vite \
  && yarn \
  && rm -rf /var/cache/apk/* /tmp/* /var/tmp/* /usr/share/man

WORKDIR ${APP_PATH}

VOLUME ${APP_PATH}

ENTRYPOINT [ "yarn", "dev" ]
