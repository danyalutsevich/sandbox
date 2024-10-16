FROM node:20-alpine as build

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build
# RUN rm -rf node_modules
# RUN rm -rf src

# FROM node:20-alpine 

# WORKDIR /app

# COPY --from=build /app/dist /app/dist
# COPY --from=build /app/package.json /app/package.json


EXPOSE 4173
# EXPOSE 5173

# CMD ["npx","vite","preview",]
CMD npx vite preview --host --port 4173

# FROM nginx:1.25.4-alpine3.18

# COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=build /app/dist /var/www/html/

# EXPOSE 3000

# ENTRYPOINT ["nginx","-g","daemon off;"]
