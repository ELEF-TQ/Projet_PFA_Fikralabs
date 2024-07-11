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

# Build the app for production
RUN yarn build

# Use an official Nginx runtime as a parent image
FROM nginx:alpine

# Copy the build output to the Nginx web server directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 80

# Run Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
