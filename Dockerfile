FROM node

WORKDIR /app/

COPY . . 

RUN npm install

CMD ["node", "app.js"]

RUN node install express mongoose hbs

EXPOSE 3000
