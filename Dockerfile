# Base image
FROM node:20-alpine


#Install postgresql client
RUN apk add --no-cache postgresql-client curl
RUN curl -sSf https://atlasgo.sh | sh

# Tạo thư mục app
WORKDIR /app

# Copy package trước để cache layer
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy toàn bộ source
COPY . .

# Cấp quyền chạy script migration
RUN chmod +x ./scripts/migrate.sh

# Build (nếu dùng TS)
RUN npm run build

# Expose port
EXPOSE 3000

# Run app
CMD ["npm", "run", "start:prod"]