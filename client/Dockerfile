# pull official base image
FROM node:12.16

# set working directory
WORKDIR /picd-app

# add `/node_modules/.bin` to $PATH
#ENV PATH /picd-app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.0 -g --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]