FROM node:12-alpine

COPY . /app/

RUN cd /app && npm install

WORKDIR /app

RUN npm run build

CMD ["npm", "run", "production"]
