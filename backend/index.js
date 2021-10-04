const express = require("express");
const loki = require("lokijs");
const app = express();
const port = 3000;
var bodyParser = require("body-parser");
var db = new loki("my-tasks.db");
db.addCollection("users");
db.addCollection("tasks");

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post("/api/users", async function (req, res) {
  try {
    let { emailId } = req.body;
    let [userResult] = await db
      .getCollection("users")
      .find({ mailId: emailId });
    let status = 200;
    if (!userResult) {
      console.log("Creating user");
      status = 201;
      userResult = await db.getCollection("users").insert({ mailId: emailId });
    }
    res.status(status).json(userResult);
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.get("/api/tasks/all/:userId", async function (req, res) {
  let userId = parseInt(req.params.userId);
  let taskDetails = await db.getCollection("tasks").find({ createdBy: userId });
  res.json(taskDetails);
});

app.post("/api/tasks", async function (req, res) {
  let { name, priority, date, createdBy } = req.body;
  await db.getCollection("tasks").insert({ name, priority, date, createdBy });
  res.status(201).send("Created");
});

app.get("/api/tasks/:taskId", async function (req, res) {
  let taskId = parseInt(req.params.taskId);
  let task = await db.getCollection("tasks").find({ $loki: taskId });
  res.json(task);
});

app.put("/api/tasks/:taskId", async function (req, res) {
  let taskId = parseInt(req.params.taskId);
  let { name, priority, date, createdBy } = req.body;
  await db.getCollection("tasks").findAndUpdate({ $loki: taskId }, (item) => {
    item.name = name;
    item.priority = priority;
    item.date = date;
    item.createdBy = createdBy;
  });
  res.send("Updated");
});

app.delete("/api/tasks/:taskId", async function (req, res) {
  let taskId = parseInt(req.params.taskId);
  await db.getCollection("tasks").findAndRemove({ $loki: taskId });
  res.send("Deleted");
});

app.listen(port, () => {
  console.log(`My tasks app listening at http://localhost:${port}`);
});
