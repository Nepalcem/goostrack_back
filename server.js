const app = require("./app");
const mongoose = require("mongoose");

const { MONGO_URL } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database connection successfull ");
    app.listen(8000, () => {
      console.log("Server running. Use our API on port: 8000");
    });
  })
  .catch((err) => {
    console.log(`Server cannot start. Error: ${err.message}`);
    process.exit(1);
  });
