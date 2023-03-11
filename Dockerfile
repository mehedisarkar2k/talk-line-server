FROM node:alpine
COPY . .
RUN yarn
EXPOSE 5000
CMD [ "yarn", "start" ]