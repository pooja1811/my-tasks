const express = require("express");
const app = express();
const port = 3000;
// var users = require("./routes/users");
// var tasks = require("./routes/tasks");
var bodyParser = require("body-parser");

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// app.use("/api/users", users);
// app.use("/api/workflows", tasks);

app.listen(port, () => {
  console.log(`My tasks app listening at http://localhost:${port}`);
});
