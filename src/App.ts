import * as express from "express";
import * as bodyParser from "body-parser";
import CouchbaseService from "./CouchbaseService";

class App {
  public express;

  constructor() {
    this.express = express();
    this.express.use(bodyParser());
    this.mountRoutes();
  }

  private mountRoutes(): void {
    const router = express.Router();
    router.get("/get", (req, res) => {
      const srv = new CouchbaseService("default");
      srv.getAllInBucket().then(rows => res.json(rows));
    });
    router.post("/save", (req, res) => {
      const srv = new CouchbaseService("default");
      srv.saveInBucket(req.body).then(result => res.json(result));
    });
    this.express.use("/", router);
  }
}

export default new App().express;
