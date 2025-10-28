// index.js
import dotenv from "dotenv";
import app from "./server.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

// Vercelではlisten不要
if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`🚀 Server started locally on port ${PORT}`);
  });
}

export default app;
