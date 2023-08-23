const app = require("./app");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
dotenv.config({ path: path.join(__dirname, "environment", ".env") });

const { MONGO_URL } = process.env;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database connection successfull \n");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((err) => {
    console.log(`Server cannot start. Error: ${err.message}`);
    process.exit(1);
  });
