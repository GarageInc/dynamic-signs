FROM oven/bun:1-alpine

WORKDIR /app

# Copy package files
COPY package.json bun.lockb* ./

# Install dependencies (ignore optional native builds)
RUN bun install --ignore-scripts

# Copy source code
COPY . .

# Build TypeScript
RUN bun run build

# Expose port
EXPOSE 3001

# Start the application
CMD ["bun", "start"]

