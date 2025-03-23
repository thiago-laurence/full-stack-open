FROM node:20
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci 

ENV DEBUG=playground:*
ENV PORT=3000

USER node

CMD ["npm", "start"]