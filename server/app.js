import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error:"));
db.once(
  "open",
  console.log.bind(console, "Successfully opened connection to Mongo!")
);

const logging = (request, response, next) => {
  console.log(`${request.method} ${request.url} ${new Date().toLocaleString("en-us")}`);
  next();
};

app.use(express.json())
app.use(logging);
app.use(cors())

app.get("/", (request, response) => {
   response.send("Welcome to the Class SPA REST API");
});

app.get("/status", (request, response) => {
  response.status(200).json({ message: "Service healthy" });
});

// Handle the request with HTTP GET method with query parameters and a url parameter
app.get("/weather/:city", (request, response) => {
  // Express adds a "params" Object to requests that has an matches parameter created using the colon syntax
  const city = request.params.city;

  // Set defaults values for the query string parameters
  let lowTemp = 32;
  if ("lowtemp" in request.query) {
    lowTemp = Number(request.query.lowtemp);
  }

  // Generate a random number to use as the temperature
  // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
  const min = 70;
  const max = 90;
  const highTemp = Math.floor(Math.random() * (max - min + 1) + min);

  // handle GET request for weather with an route parameter of "city"
  response.json({
    text: `The weather in ${city} is ${highTemp} degrees today.`,
    temp: {
      current: highTemp,
      low: lowTemp
    },
    city
  });
});

const server = app.listen(PORT, () => console.log(`Listening on port ${server.address().port}`));