# Event-Management-Platform


A Node.js backend application with Express, MongoDB, and real-time capabilities using Socket.IO.

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.IO for real-time communication
- JWT for authentication
- bcrypt for password hashing
- CORS for cross-origin resource sharing

## Prerequisites

Before running this project, make sure you have:

- Node.js installed (v14 or higher recommended)
- MongoDB installed and running
- npm or yarn package manager

## Installation

1. Clone the repository:



## Dependencies

- **bcrypt** (v5.1.1) - Password hashing
- **bcryptjs** (v2.4.3) - Alternative password hashing library
- **cors** (v2.8.5) - Enable CORS for all routes
- **dotenv** (v16.4.5) - Load environment variables
- **express** (v4.21.2) - Web framework for Node.js
- **jsonwebtoken** (v9.0.2) - JWT authentication
- **mongoose** (v8.6.3) - MongoDB object modeling
- **nodemon** (v3.1.9) - Development server with auto-reload
- **socket.io** (v4.8.1) - Real-time bidirectional communication

## Running the Application

### Development Mode
npm start
This will start the server using nodemon, which automatically restarts when file changes are detected.

### Production Mode
node server.js

## API Endpoints

Document your API endpoints here. For example:

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Users
- GET `/api/users` - Get all users
- GET `/api/users/:id` - Get user by ID
- PUT `/api/users/:id` - Update user
- DELETE `/api/users/:id` - Delete user

## Socket.IO Events

Document your Socket.IO events here. For example:

- `connection` - Client connects to server
- `disconnect` - Client disconnects from server
- `message` - Handle real-time messages

## Security

This project implements several security measures:

- Password hashing using bcrypt
- JWT-based authentication
- CORS protection
- Environment variables for sensitive data

## Error Handling

The application includes centralized error handling middleware for consistent error responses.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Contact

Your Name - pankajkumar977195@gmail.com
Project Link: 

## Acknowledgments

- List any resources or people you want to acknowledge
- Add any third-party assets or libraries you used
- Include any other credits




