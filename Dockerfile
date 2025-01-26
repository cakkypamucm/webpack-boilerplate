FROM node:18.20-alpine3.20 AS build
WORKDIR /app
RUN apk add git
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.27.3-alpine3.20
ARG APP_NGINX_ROOT
ARG APP_PORT
COPY --from=build /app/dist ${APP_NGINX_ROOT}
COPY nginx.conf /etc/nginx/templates/nginx.conf.template
EXPOSE ${APP_PORT}
