# FROM node:20-alpine as build
# WORKDIR /frontend
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# FROM nginx:stable-alpine AS production
# COPY --from=build /frontend/dist /user/share/nginx/html
# EXPOSE 80
# CMD ["nginx","-g","daemon off;"]

FROM node:20-alpine
WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY . .
