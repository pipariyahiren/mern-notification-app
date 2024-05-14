FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for server
COPY server/package*.json ./server/
WORKDIR /usr/src/app/server/
RUN npm install
# Move back to the root directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for client
COPY client/package*.json ./client/
WORKDIR /usr/src/app/client/
RUN npm install

# Move back to the root directory
WORKDIR /usr/src/app

# Copy the rest of the application code
COPY . .

COPY server/.env server/.env
COPY client/.env client/.env

# Build the React app
WORKDIR /usr/src/app/client
RUN npm run build

# Move the build folder to the server directory
WORKDIR /usr/src/app
RUN mv ./client/build ./server/build

RUN npm install -g concurrently
RUN npm install -g nodemon

# Expose the port the app runs on
EXPOSE 5000
EXPOSE 3000

# Command to run the app
WORKDIR /usr/src/app/server/
CMD ["npm", "run", "dev"]
