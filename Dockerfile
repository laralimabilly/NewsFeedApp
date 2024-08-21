# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React application
RUN npm run build

# Install serve globally to serve the built app
RUN npm install -g serve

# Set the command to run the app
CMD ["serve", "-s", "dist"]

# Expose the port the app runs on
EXPOSE 3000