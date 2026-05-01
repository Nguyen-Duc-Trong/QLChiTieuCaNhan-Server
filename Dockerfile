# Base image
FROM node:18-alpine

# Tạo thư mục app
WORKDIR /app

# Copy package trước để cache layer
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy toàn bộ source
COPY . .

# Build (nếu dùng TS)
RUN npm run build

# Expose port
EXPOSE 3000

# Run app
CMD ["npm", "run", "start:prod"]