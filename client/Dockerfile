# Use an official Node.js runtime as a parent image
FROM node:latest as build

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

RUN yarn build

# Expose the port your app runs on (if necessary)
# Replace with the actual port your app listens to
EXPOSE 3000

# Command to run your application
CMD ["yarn", "start"]
