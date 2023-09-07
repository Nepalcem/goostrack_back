# Node.js Goose Track - Backend part

The Goose Track Time Planning Application is a powerful Full Stack tool designed to enhance users' productivity and time management capabilities. It places a strong emphasis on user security, user experience, and continuous improvement.

## Key Features:

1. User Registration and Authentication:
   - User Registration: Users can create accounts with a unique username, email address, and secure password.
   - User Authentication: The app employs robust user authentication methods for secure login.
   - Secure Data Storage: Sensitive user data, including passwords, is stored securely with encryption.
2. Task Management:
   - Create, Update, Delete: Users can easily manage tasks, including creating, updating, and deleting them.
   - Comprehensive Task Details: Each task includes essential details like title, date, time, priority, and progress status for accurate tracking.
   - Categorization and Tagging: Task organization is simplified through categorization and tagging features.
   - Due Dates and Reminders: Users can set due dates and receive task reminders.
   - Task Progress Tracking: Tasks can be marked as completed or in progress for clear status tracking.
3. User Dashboard:
   - Intuitive Dashboard: The user-friendly dashboard provides a centralized view of tasks, statistics, and progress.
   - Organized Task Lists: Tasks are displayed in organized lists, sorted by priority, date, or progress status.
   - Task Statistics: Users gain insights into their productivity with statistics on completed, in-progress, and upcoming tasks.
4. Security:
   - Token-Based Authentication: Token-based authentication secures API endpoints for user data protection.
   - Security Measures: Stringent data validation and sanitization practices are implemented to prevent security vulnerabilities.
   - Secure Data Transmission: HTTPS encryption ensures secure data transfer between the client and server.
5. User Profile:
   - Profile Customization: Users can personalize their profiles by updating personal information and avatars.
   - Profile Display: User details and profile pictures are prominently featured, creating a personalized experience.
6. Data Storage:
   - Reliable Database: The app utilizes MongoDB, a robust database system, to securely store user profiles and task data.
7. API:
   - API Documentation: Comprehensive Swagger/OpenAPI documentation provides exhaustive information on effectively using the application.
8. Deployment:
   - Hosting: The app is hosted on the Render platform, with user photos securely stored and served from Cloudinary.
9. User Feedback and Improvement:

- Feedback Collection: Actively collects user feedback to drive continuous improvement in app features and usability, ensuring it meets user expectations and needs.

[Live Page](https://nepalcem.github.io/goostrack_front/)

## Tools

Goose Track is built using the following tools:

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white) ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

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
- [Swagger](https://goostrack-backend.onrender.com/api-docs)
- [Live Page](https://nepalcem.github.io/goostrack_front/)

## Backend team

- [Michael Lykhovyd](https://github.com/Nepalcem)
- [Iryna Bigdash](https://github.com/Iryna-Bigdash)
- [Olexandr Hrynenko](https://github.com/laytlat)
- [Nataliia Dyrkach](https://github.com/NataliiaDyrkach)
