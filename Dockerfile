FROM node:22.23.1-alpine

ARG APP_PATH=/app

ENV PORT=1234
ENV CYPRESS_INSTALL_BINARY=0

WORKDIR ${APP_PATH}

COPY ["./app/package.json", "./app/yarn.lock", "./"]

RUN yarn --frozen-lockfile \
  && rm -rf /var/cache/apk/* /tmp/* /var/tmp/* /usr/share/man

VOLUME ${APP_PATH}

ENTRYPOINT [ "yarn", "dev" ]
