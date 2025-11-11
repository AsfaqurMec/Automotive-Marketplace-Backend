// index.ts
// import express from 'express';
// import http from 'http';
// import cors from 'cors';
// import morgan from 'morgan';
// import cookieParser from 'cookie-parser';
// import router from './apiRoutes.js';
// import { configData } from '../config/index.js';
// import { handle } from 'i18next-http-middleware';
// import i18next from '../i18n.js';
// import initSocket from '../sockets/index.js';
// // Express App Setup
// const app = express();
// const server = http.createServer(app);
// // Middleware
// app.use(cors({ origin: configData.CORS_ORIGINS, credentials: true }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(morgan('dev'));
// app.use(handle(i18next));
// // API Routes
// app.use('/api', router);
// // Initialize Socket.IO
// initSocket(server);
// export default server;
import express from 'express';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import router from './apiRoutes.js';
import { configData } from '../config/index.js';
import { handle } from 'i18next-http-middleware';
import i18next from '../i18n.js';
import initSocket from '../sockets/index.js';
// Express app setup
const app = express();
const server = http.createServer(app);
// Middleware
app.use(cors({ origin: configData.CORS_ORIGINS || '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(handle(i18next));
// API routes
app.use('/api', router);
// Test route
app.get('/', (req, res) => {
    res.send('✅ Socket.io server is running');
});
// Initialize Socket.io
initSocket(server);
export default server;
//# sourceMappingURL=index.js.map