import express from "express";
import http from "http";
import config from "./config/config"
import logging from "./config/logging"
import firebaseAdmin from "firebase-admin";
import mongoose from "mongoose";

import userRoutes from "./routes/user"

const router = express();

// Server handling
const httpServer = http.createServer(router);

// Connect to firebase admin
let serviceAccountKey = require('./config/serviceAccountKey.json');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccountKey)
});

// Connect to mongodb
// noinspection JSVoidFunctionReturnValueUsed
mongoose.connect(config.mongo.url, config.mongo.options)
  .then(() => {
    logging.info('Mongo connected.');
  }).catch((error) => {
    logging.error(error);
});

// Logging middleware
router.use((req, res, next) => {
  logging.info(`Method: '${req.method}' - URL: '${req.url}' - IP: '${req.socket.remoteAddress}'`);
  
  res.on('finish', () => {
    logging.info(`Method: '${req.method}' - URL: '${req.url}' - IP: '${req.socket.remoteAddress}' - STATUS: '${res.statusCode}'`);
  });
  
  next();
});

// Parse the body
router.use(express.urlencoded({extended: true}));
router.use(express.json());

// API Access policies
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  
  next();
});

// Routes
router.use('/users', userRoutes);

// Error Handling
router.use((req, res, next) => {
  const error = new Error('Not found');
  next();
  return res.status(404).json({
    message: error.message
  });
});

// Listen fro requests
httpServer.listen(config.server.port, () => { logging.info(`Server is running at ${config.server.port} ... `) })