var express = require("express");
require("./src/db/mongoose");
const User = require("./src/models/User");
var app = express();

app.use(express.json());

app.get("/users", function (req, res) {
  User.find({})
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      res.send(e);
    });
});

app.post("/addUser", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch((e) => {
      res.send(e);
    });
});

app.delete("/deleteUser/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      res.send(e);
    });
});

app.patch("/updateUser/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      res.send(e);
    });
});

app.listen(3000, function () {
  console.log("App listening on port 3000!");
});
