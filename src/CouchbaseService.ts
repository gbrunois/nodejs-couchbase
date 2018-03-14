import * as util from "util";
import * as UUID from "uuid";
import { Bucket, Cluster, N1qlQuery } from "couchbase";

interface ClusterEx extends Cluster {
  authenticate(user: string, password: string): void;
}

class CouchbaseService {
  constructor(private bucketName: string) {}

  async getAllInBucket() {
    const bucket = this.openBucket();
    var query = N1qlQuery.fromString(
      "SELECT `" + this.bucketName + "`.* FROM `" + this.bucketName + "`"
    );

    const promise = new Promise((resolve, reject) => {
      const callback = (error, rows) => {
        if (error) {
          reject(error);
        } else {
          resolve(rows);
        }
      };
      bucket.query(query, callback);
    });

    return await promise;
  }

  async saveInBucket(payload) {
    const bucket = this.openBucket();
    const promise = new Promise((resolve, reject) => {
      const callback = (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      };
      bucket.insert(UUID.v4(), payload, callback);
    });
  }

  private openBucket(): Bucket {
    const cluster = new Cluster(
      "couchbase://localhost?detailed_errcodes=1"
    ) as ClusterEx;
    cluster.authenticate("Nodejs", "couchbase");
    const bucket = cluster.openBucket("default");
    bucket.connectionTimeout = 100000;
    return bucket;
  }
}

export default CouchbaseService;
