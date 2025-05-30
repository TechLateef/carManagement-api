# Car Management API

A Node.js API for managing cars and managers, built with Express, Mongoose, and TypeScript.

## Features

- User authentication (JWT)
- CRUD operations for Cars and Managers
- Car listing with pagination and filters (brand, model, price, availability)
- Input validation with class-validator

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [Yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/)

### Installation

```bash
yarn install
```

### Environment Variables

Create a `.env` file in the root directory and set the following:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/car-management
JWT_SECRET=your_jwt_secret
```

### Running the App

```bash
yarn start
```

For development with auto-reload:

```bash
yarn dev
```

### API Endpoints

- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Login and get JWT
- `GET /cars` - List cars (supports filters and pagination)
- `POST /cars` - Create a car
- `GET /cars/:id` - Get car by ID
- `PUT /cars/:id` - Update car
- `DELETE /cars/:id` - Delete car

## License

MIT
