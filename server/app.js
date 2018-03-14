var Couchbase = require("couchbase");
var Express = require("express");
var BodyParser = require("body-parser");
var UUID = require("uuid");

var app = Express();

app.use(BodyParser.json());

app.get("/", function(request, response) {
  response.send("Try using the `/get` or `/save` endpoints!");
});

app.get("/get", function(request, response) {
  var N1qlQuery = Couchbase.N1qlQuery;
  var cluster = new Couchbase.Cluster(
    "couchbase://couchbase?detailed_errcodes=1"
  );
  cluster.authenticate("Nodejs", "couchbase");
  var bucket = cluster.openBucket("default");
  bucket.connectionTimeout = 100000;
  var query = N1qlQuery.fromString(
    "SELECT `" + bucket._name + "`.* FROM `" + bucket._name + "`"
  );
  bucket.query(query, function(error, result) {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result);
  });
});

app.post("/save", function(request, response) {
  var N1qlQuery = Couchbase.N1qlQuery;
  var cluster = new Couchbase.Cluster(
    "couchbase://couchbase?detailed_errcodes=1"
  );
  cluster.authenticate("Nodejs", "couchbase");
  var bucket = cluster.openBucket("default");
  bucket.connectionTimeout = 100000;
  bucket.insert(UUID.v4(), request.body, function(error, result) {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result);
  });
});

var server = app.listen(process.env.APPLICATION_PORT || 3000, function() {
  console.log("Listening on port " + server.address().port + "...");
});
