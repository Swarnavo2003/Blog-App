import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import logger from "./config/logger.js";
dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectDB();
  logger.info(`Server running on http://localhost:${PORT}`);
});
