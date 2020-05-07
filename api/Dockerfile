# pull official base image
FROM node:12.16

# set working directory
WORKDIR /picd-server

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]