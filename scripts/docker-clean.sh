docker stop $(docker ps -a | grep couchbase-custom | awk '{print $1}')
docker rm $(docker ps -a | grep couchbase-custom | awk '{print $1}')  

docker stop $(docker ps -a | grep nodejs-custom | awk '{print $1}')
docker rm $(docker ps -a | grep nodejs-custom | awk '{print $1}')  

docker rmi $(docker images -f "dangling=true" -q)
docker rmi $(docker images nodejs-custom -q)
docker rmi $(docker images couchbase-custom -q)