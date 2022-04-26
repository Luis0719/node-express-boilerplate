FROM node:16.14.2 as builder
WORKDIR /usr/src/app
COPY . /usr/src/app
ENTRYPOINT ["./docker-entrypoint.sh"]

FROM builder as dev
ENV NODE_ENV=development
RUN ["npm", "install"]
CMD [ "npm", "run", "start" ]
EXPOSE 3000

FROM builder as prod
ENV NODE_ENV=production
RUN ["npm", "install", "--production"]
CMD [ "npm", "run", "start" ]
EXPOSE 3000

