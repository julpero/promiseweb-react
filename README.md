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
USER_HASH = this must match frontend .env REACT_APP_USER_HASH setting
ADMIN_USER_NAME = comma separated list of user names that can do admin operations
ADMIN_DUMMY_PASS = just something nonsense to handle admin operations
```

Also you need .env file in your frontend with following setting
```
REACT_APP_USER_HASH = this must match backend .env USER_HASH setting
```

### Production

Create a .env file in the root and add the following

```
MONGO_URI = your mongodb uri
BCRYPT_SECRET = some secret
BCRYPT_SALT_ROUNDS = number
USER_HASH = this must match frontend .env REACT_APP_USER_HASH setting
ADMIN_USER_NAME = comma separated list of user names that can do admin operations
ADMIN_DUMMY_PASS = just something nonsense to handle admin operations
```
Also you need .env file in your frontend with following setting
```
REACT_APP_USER_HASH = this must match backend .env USER_HASH setting
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
