import express from "express";
import cors from "cors";
import morganMiddleware from "./logger/indexLog.js";
import { errorHandler } from "./middlewares/error.middlewares.js";

const app = express();
app.use(morganMiddleware()); 
app.use(
     cors({
          origin: process.env.CORS_ORIGIN,
          credentials: true,
     })
);

// Middleware to parse JSON and URL-encoded data along with static files
app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({extended: true, limit: '16kb'}))
app.use(express.static('public'));


// Importing routes
import healthCheckRouter from "./routes/healthCheck.routes.js";
import userRouter from "./routes/user.routes.js";

// Routes
app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/users", userRouter);

app.use(errorHandler)

export {app};