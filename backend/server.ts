import express from 'express';
import { Application, Request, Response } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db';
import { errorHandler, notFound } from './middlewares/errorMiddleware';

import bcrypt from 'bcrypt';


// Routes
import roomRoutes from './routes/roomRoutes';
import userRoutes from './routes/userRoutes';
import bookingRoutes from './routes/bookingRoutes';
import uploadRoutes from './routes/uploadRoutes';

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server);

dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Default
app.get("/api", (req: Request, res: Response)  => {
    res.status(201).json({ message: "Welcome to Hotel Booking App" });
})

// Room Route
app.use("/api/rooms", roomRoutes);

// User Route
app.use("/api/users", userRoutes);

// Booking Route
app.use("/api/bookings", bookingRoutes);

// Upload Route
app.use("/api/uploads", uploadRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.status(201).send(process.env.PAYPAL_CLIENT_ID);
});

app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 5000;

// app.listen(PORT, (): void => console.log(`Server is running on PORT ${PORT}`));
server.listen(PORT, () => {
  console.log('server listening on *:' + PORT);
});

io.on("connection", (socket: Socket) => {
  console.log("connected!");
  console.log(socket.id);
  socket.on("disconnect", () => {
    console.warn("user disconnected");
  })
})