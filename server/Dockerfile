# Use node.js base image
FROM node:latest as build

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the source code
COPY . .

# Expose the port on which the React app will run
EXPOSE 3001

# Start Nest.js development server
CMD ["yarn", "start:dev"]