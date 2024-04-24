# Base image
FROM node:latest as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the source code
COPY . .

# Expose the port on which the React app will run
EXPOSE 5173

# Start the React app
CMD ["yarn", "dev"]