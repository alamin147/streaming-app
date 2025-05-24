import { Server } from "http";
import app from "./app";
import { connectDB } from "./app/connectDB";
const port = process.env.PORT || 5000;

async function main() {
  try {

    await connectDB();

    const server: Server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

main();
