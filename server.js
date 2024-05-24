const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/submit", (req, res) => {
  const { firstName, lastName, otherNames, email, phoneNumber, gender } =
    req.body;

  const newEntry = {
    firstName,
    lastName,
    otherNames,
    email,
    phoneNumber,
    gender,
  };

  fs.readFile("database.json", (err, data) => {
    if (err) throw err;
    let database = JSON.parse(data);
    database.push(newEntry);
    fs.writeFile("database.json", JSON.stringify(database, null, 2), (err) => {
      if (err) throw err;
      res.json({ success: true });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
