FROM node as builder
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
RUN npm run build


FROM nginx:alpine
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html/dist
COPY ./index.html /usr/share/nginx/html/index.html
