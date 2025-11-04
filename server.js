const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: "config.env" });
const app = express();

const PORT = process.env.PORT || 6000;
app.listen(6000, () => {
  console.log(`App running on port ${PORT}`);
});
