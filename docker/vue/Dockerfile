FROM node:lts-slim

WORKDIR /webapp

COPY ./docker/vue/entrypoint.sh /entrypoint.sh

RUN groupadd -r webapps \
    && useradd -r -g webapps web \
    && chown -R web /webapp \
    && chmod +x /entrypoint.sh \
    && chown web /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
