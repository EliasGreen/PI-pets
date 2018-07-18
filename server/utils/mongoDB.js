const assert = require("assert");
const mongodb = require("mongodb");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const MongoClient = mongodb.MongoClient;
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const url = process.env.MONGOLAB_URI;
const promise_connection = mongoose.connect(url, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});
const db = mongoose.connection;

promise_connection.then((db) => {
	console.log("MongoDB -> connected");
});

const store = new MongoDBStore(
  {
    uri: url,
    collection: "sessions"
  });
  store.on("error", (error) => {
    assert.ifError(error);
    assert.ok(false);
});

module.exports = { assert, mongodb, MongoClient, mongoose, url, promise_connection, db, session, store};