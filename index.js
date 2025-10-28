// index.js
import dotenv from "dotenv";
import app from "./server.js";

dotenv.config();

if (process.env.VERCEL !== "1") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

export default app;
