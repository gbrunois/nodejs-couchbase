docker stop $(docker ps -aq)
docker rm $(docker ps -aq)  

docker build -t couchbase-custom ./couchbase/.
docker build -t nodejs-custom ./node-server/.

docker-compose up -d        