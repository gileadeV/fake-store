# Use the official Node.js 20 image as a base.
FROM node:20-alpine AS base

# Set the working directory in the container.
WORKDIR /app

# Copy package.json and package-lock.json (if available).
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application's source code.
COPY . .

# Build the Next.js application.
RUN npm run build

# Start a new stage from a smaller image.
FROM node:20-alpine AS runner

# Set the working directory.
WORKDIR /app

# Copy the built application from the previous stage.
COPY --from=base /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/public ./public

# Expose the port the app runs on.
EXPOSE 3000

# The command to start the application.
CMD ["npm", "start"]
