docker run -d -p 8091-8094:8091-8094 -p 11210:11210 \
-e COUCHBASE_ADMINISTRATOR_USERNAME=Administrator \
-e COUCHBASE_ADMINISTRATOR_PASSWORD=password \
-e COUCHBASE_BUCKET=default \
-e COUCHBASE_BUCKET_USER=Nodejs \
-e COUCHBASE_BUCKET_PASSWORD=couchbase \
--network="bridge" \
--name couchbase \
couchbase-custom