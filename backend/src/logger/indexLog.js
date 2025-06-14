import logger from "./logger.js";
import morgan from "morgan";

const morganFormat = ":method :url :status :response-time ms";

const morganMiddleware = () => {
  return morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  });
};


export default morganMiddleware;








// This code sets up a middleware for logging HTTP requests using Morgan.
// It formats the log messages to include the HTTP method, URL, status code, and response time.
// The log messages are then written to the logger, which can be configured to log to the console or a file.
// The `morganMiddleware` function can be used in an Express application to log incoming requests.
// import morganMiddleware from "logger/indexLog.js";
// app.use(morganMiddleware());   (Make sure to use this in your Express app setup after const app = express())