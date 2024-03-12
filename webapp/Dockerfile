# Stage 1
FROM node:20 as build-stage

WORKDIR /webapp
COPY package.json .
RUN npm install
COPY . .

ARG API_BASE_URL
ENV API_BASE_URL=$API_BASE_URL

RUN npm run build

# Stage 2
FROM nginx:1.17.0-alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /webapp/dist /usr/share/nginx/html
EXPOSE 80

CMD nginx -g 'daemon off;'