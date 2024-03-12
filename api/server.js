require("dotenv").config();

const express = require("express");
const cors = require("cors");

const server = express();

var corsOptions = {
  origin: [
    process.env.CLIENT_ORIGIN || "http://localhost:8888",
    "https://applng-test.vercel.app",
    "https://applng-webapp-ganni.vercel.app",
    "http://localhost:5173",
  ],
};

server.use(cors(corsOptions));

// parse requests of content-type - application/json
server.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

const db = require("./server/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
server.get("/", (req, res) => {
  res.json({ message: "Welcome to MEVN application." });
});

require("./server/routes/tutorial.routes")(server);

// set port, listen for requests
const PORT = process.env.APISERVER_DOCKER_PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
