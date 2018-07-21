const express = require("express");
const app = express();
app.use(express.static("public"));

const mongoDB__utils = require("./server/utils/mongoDB");
const loginCheck = require("./server/middlewares/loginCheck");

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(mongoDB__utils.session({
  secret: process.env.COOKIE_SECRET,
  cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 1
      },
  store: mongoDB__utils.store,
  resave: false,
  saveUninitialized: false
}));


const authenticating_router = require("./server/routers/authenticating");
app.use("/authenticating", authenticating_router);

const user_router = require("./server/routers/user");
app.use("/user", user_router);

app.get("*", loginCheck, (request, response) => {
  response.sendFile(__dirname + "/app/index.html");
});

const listener = app.listen(process.env.PORT, () => {
  console.log("App has started on port " + listener.address().port);
});