// import { config } from 'dotenv';
// import server from './routes/index.js';
// import connectDB from './config/db.js';
// config();
// const PORT = process.env.PORT || process.env.port;
// if (!PORT) {
//   // console.error('❌ PORT environment variable is not defined');
//   process.exit(1);
// }
// connectDB().then(() => {
//   server.listen(PORT, () => {
//      console.log(`🚀 Server running on http://localhost:${PORT}`);
//   });
// }).catch(() => {
//   // console.error('❌ Failed to connect to database:', err);
// });
import { config } from 'dotenv';
import server from './routes/index.js';
import connectDB from './config/db.js';
config();
// Railway automatically sets process.env.PORT
const PORT = process.env.PORT || 5000;
if (!PORT) {
    console.error('❌ PORT environment variable is not defined');
    process.exit(1);
}
// Connect to MongoDB and start the server
connectDB()
    .then(() => {
    server.listen(Number(PORT), '0.0.0.0', () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error('❌ Failed to connect to database:', err);
    process.exit(1);
});
//# sourceMappingURL=server.js.map