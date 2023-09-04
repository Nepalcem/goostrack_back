# Node.js Goose Track - Backend part

Full Stack Application.

[Live Page](https://nepalcem.github.io/goostrack_front/)

## Tools

Goose Track is built using the following tools:

- MongoDB
- Express.js
- Node.js

## Installation

To install Goose Track, follow these steps:

1. Clone the Goose Track repository to your local machine using git clone from [Repository](https://github.com/Nepalcem/goostrack_back)
2. Install dependencies using npm install or yarn install.
3. Create .env file and add your environment variables:
   - MONGO_URL: your MongoDB connection string
   - SECRET_KEY: secret key email service
   - JWT_EXPIRES_IN: secret string for signing reset token
   - BASE_URL: URL Front End part
   - META_PASSWORD: password email service
   - META_EMAIL: user email service
   - ELASTIC_EMAIL_API_KEY: elastic api key
   - CLOUDINARY_URL: cloudinary URL
   - CLOUD_NAME: cloudinary api name
   - API_KEY: cloudinary api key
   - API_SECRET: cloudinary api secret
     all environments you find in .env.example
4. Start the server using

- $ npm run start:dev for production development
- $ npm start for production
- $ npm lint:fix linter check with automatic fixing of minor errors.

## Links

- [Frontend Repository](https://github.com/Nepalcem/goostrack_front)
- [Backend Repository](https://github.com/Nepalcem/goostrack_back)
