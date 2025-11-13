const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "config.env" });
const globalErrorHandler = require("./Middlewares/errorMiddleware");
const dbConnection = require("./config/database");
//Routes
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const hotelRoute = require("./routes/hotelRoute");
const roomRoute = require("./routes/roomRoute");

//Connect with DB
dbConnection();

//Express app
const app = express();

//Middlewares
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/hotels", hotelRoute);
app.use("/api/v1/rooms", roomRoute);

// 404 handler (optional)
app.all(/.*/, (req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global error middleware
app.use(globalErrorHandler);

const PORT = process.env.PORT || 6000;
app.listen(6000, () => {
  console.log(`App running on port ${PORT}`);
});
