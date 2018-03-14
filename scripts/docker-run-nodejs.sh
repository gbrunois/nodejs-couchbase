docker run -d  -p 3000:3000 \
-e COUCHBASE_HOST=couchbase \
-e COUCHBASE_BUCKET=default \
-e COUCHBASE_BUCKET_PASSWORD= \
--network="bridge" \
-e APPLICATION_PORT=3000 \
--name nodejs nodejs-custom