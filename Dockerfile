FROM node:12.11.1 as builder

RUN apt-get update

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY . /app
RUN npm install
RUN npm run build:prod

FROM nginx:1.17.0-alpine as production

USER root

MAINTAINER Engin Polat (polatengin) <engin@enginpolat.com>

COPY --from=builder /app/dist /usr/share/nginx/html

RUN nginx

EXPOSE 80

LABEL maintainer="Engin Polat (polatengin) <engin@enginpolat.com>" \
      org.label-schema.docker.dockerfile="/Dockerfile" \
      org.label-schema.license="MIT" \
      org.label-schema.name="IdleTime in WebApps" \
      org.label-schema.vcs-type="Git" \
      org.label-schema.vcs-url="https://github.com/polatengin/budapest"
