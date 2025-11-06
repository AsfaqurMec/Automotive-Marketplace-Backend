import { config } from 'dotenv';
import server from './routes/index.js';
import connectDB from './config/db.js';
config();
const PORT = process.env.PORT || process.env.port;
if (!PORT) {
    // console.error('❌ PORT environment variable is not defined');
    process.exit(1);
}
connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}).catch(() => {
    // console.error('❌ Failed to connect to database:', err);
});
//# sourceMappingURL=server.js.map