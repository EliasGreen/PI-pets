const express = require("express");
const app = express();

const authenticating_router = require("./server/routers/authenticating");
app.use("/authenticating", authenticating_router);

app.use(express.static("public"));

app.get("*", (request, response) => {
  response.sendFile(__dirname + "/app/index.html");
});

const listener = app.listen(process.env.PORT, () => {
  console.log("App has started on port " + listener.address().port);
});
