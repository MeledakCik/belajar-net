# Gunakan image node yang ringan
FROM node:18-alpine

WORKDIR /app

# Copy package.json dan install dependency
COPY package*.json ./
RUN npm install

# Copy semua file dan build proyek
COPY . .
RUN npm run build

# Jalankan dalam mode produksi
EXPOSE 3000
CMD ["npm", "start"]