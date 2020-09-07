# pull official base image
FROM node:12.16

# set working directory
RUN mkdir -p /app
WORKDIR /app

# get app dependencies
COPY package.json ./app
COPY package-lock.json ./app

# add app
COPY . /app

# install app dependencies
RUN npm install --silent


# start app
CMD ["npm", "start"]