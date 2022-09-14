# PromiseWeb

PromiseWeb Card Game App Using The MERN Stack With TypeScript & Redux and Socket.io 🤩


## Technology Stack:

- TypeScript
- Node js
- Express Js
- MongoDB (Mongoose)
- React
- React Bootstrap
- Redux
- Socket.io
- React Spring

## Environment Variables

### Development

Create a .env file in the root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
BCRYPT_SECRET = some secret
BCRYPT_SALT_ROUNDS = number
ADMIN_USER_NAME = comma separated list of user names that can do admin operations
ADMIN_DUMMY_PASS = just something nonsense to handle admin operations
```

### Production

Create a .env file in the root and add the following

```
MONGO_URI = your mongodb uri
BCRYPT_SECRET = some secret
BCRYPT_SALT_ROUNDS = number
ADMIN_USER_NAME = comma separated list of user names that can do admin operations
ADMIN_DUMMY_PASS = just something nonsense to handle admin operations
```

## Install Dependencies

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend
npm run client

# Run backend
npm run server
```

### Tests

At the moment there are only some unit tests to the backend.
```
# Test backend
npm run test
```
To test frontend first change directory to frontend and run tests there.

- Version: 0.1.0
- License: MIT
- Author: Juha Korhonen
