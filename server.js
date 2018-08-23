const express = require("express");
const app = express();

const server = require("http").Server(app);

const listOfUsersSockets = require("./server/utils/listOfUsersSockets");

const io = require("socket.io")(server);
io.sockets.on("connection", (socket) => {
  console.log("Connected: " + socket.id);
  
  socket.on("addNewUsersSocket", (userID) => {
     console.log("Added new user: " + socket.id);
     listOfUsersSockets.addNewSocket(userID, socket);
   });
  
  socket.on("disconnect", () => {
     console.log("Disconnected: " + socket.id);
     listOfUsersSockets.deleteSocket(socket);
   });
  
});

server.listen(process.env.PORT || 3000, () => {
  console.log("App has started on port " + process.env.PORT);
});

app.use(express.static("public"));

const mongoDB__utils = require("./server/utils/mongoDB");

const checkerOfPets = require("./server/utils/checkerOfPets");
checkerOfPets.start();

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