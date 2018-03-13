docker stop $(docker ps -a -f "name=nodejs" -q)
docker rm $(docker ps -a -f "name=nodejs" -q)  
docker rmi $(docker images nodejs-custom -q)

docker build -t nodejs-custom ../.
docker run -d  -p 3000:3000 \
-e COUCHBASE_HOST=couchbase \
-e COUCHBASE_BUCKET=default \
-e COUCHBASE_BUCKET_PASSWORD= \
--network="my-bridge-network" \
-e APPLICATION_PORT=3000 --name nodejs nodejs-custom