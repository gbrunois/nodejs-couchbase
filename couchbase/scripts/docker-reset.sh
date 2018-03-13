docker stop $(docker ps -f "name=couchbase" -q)
docker rm $(docker ps -f "name=couchbase" -q)  