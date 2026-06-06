FROM node:20-bullseye-slim

# Install necessary compilers and runtime environments
# build-essential includes gcc and g++
# default-jdk includes javac and java
# python3 includes the Python runtime
RUN apt-get update && apt-get install -y \
    build-essential \
    default-jdk \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install dependencies (only production dependencies are strictly needed, but let's install all just in case)
RUN npm install --omit=dev

# Bundle app source
COPY . .

# Ensure temp and temp_exec directories exist
RUN mkdir -p temp temp_exec

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD [ "node", "server.js" ]
