const mongoose = require('mongoose'); // Importing the mongoose library for MongoDB database operations

const app = express(); // Creating an instance of the Express application
const PORT = process.env.PORT || 3000; // Setting the port number for the server to listen on

app.use(express.json()); // Adding middleware to parse incoming requests with JSON payloads

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ideavineDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// Connecting to the MongoDB database using the Mongoose library. The connection string is either taken from the environment variable MONGODB_URI or defaults to 'mongodb://localhost:27017/ideavineDB'. The options object specifies to use the new URL parser and the new server discovery and monitoring engine.

app.listen(PORT, () => {
  console.log(`Ideavine API running on http://localhost:${PORT}`);
});
// Starting the server and making it listen on the specified port. When the server starts successfully, it logs a message to the console indicating the URL where the API is running.