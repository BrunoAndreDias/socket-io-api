import express from 'express';
import http from 'http';
import axios from 'axios';
import socketIo from 'socket.io';
import mongoose from 'mongoose';
import todoModel from './models/todo';

require('dotenv').config();

const port = process.env.PORT || 4001;

const app = express();
const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const io = socketIo(server);

// communication to the DarkSkyApi
const getApiAndEmit = async (socket, { lat, long }) => {
  try {
    const res = await axios.get(
      `${process.env.DARKSKY_API}${lat},${long}`,
    );

    socket.emit('FromAPI', res.data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

// socket connection
let interval;
io.on('connection', async (socket) => {
  console.log('Client connected.');

  if (interval) {
    clearInterval(interval);
  }

  // initial connection need to send data for client
  const todos = await todoModel.find();
  socket.emit('all-todo', todos);

  socket.on('location', (data) => {
    interval = setInterval(() => getApiAndEmit(socket, data), 10000);
  });

  socket.on('create-Todo', async (todo) => {
    await todoModel.create(todo);
    const allTodos = await todoModel.find();
    socket.emit('all-todo', allTodos);
  });

  socket.on('delete-todo', async (todo) => {
    await todoModel.remove(todo);
    const allTodos = await todoModel.find();
    socket.emit('all-todo', allTodos);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
