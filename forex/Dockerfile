FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install
RUN node database.js

# Bundle app source
COPY . .

EXPOSE 3000
CMD ["npm", "start"]