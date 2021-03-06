const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3001;

app.use(cors());

app.get("/message", (req, res) => {
  console.log("GET request for /message recieved!");
  return res.json({
    data: "Thanks for using web-starter-cli! This message came from Express.js."
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
