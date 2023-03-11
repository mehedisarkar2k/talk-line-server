FROM node:alpine
COPY . .
RUN yarn
EXPOSE 3000
# install pm2
# RUN yarn global add pm2
# start pm2
CMD [ "yarn", "start" ]