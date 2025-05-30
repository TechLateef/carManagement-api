require("dotenv").config();
import "reflect-metadata";
import { connectDB } from "./db"; 
import app from "./src/index"; 

const { PORT = 3000 } = process.env;



(async () => {
  try {
    await connectDB(); 
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1); 
  }
})();