# How-to-connect-trino-with-apollo-federation-in-nodeJS-typescript
Example to showcase simple NodeJS typescript demo to connect preconfigured trino client with apollo federation

Step 1:
Configure database in ..trino-pgsql/etc/catalog.

Step 2:
Start trino server from docker.

cmd ..apolloFedTrinoTS/trino-pgsql

docker-compose up -d

Check health:
To check whether trino server is running(In status should show 'Healthy'):

docker ps

Step 3:
Install NPM dependencies.

npm install

Step 4:
Start subgraph servers.

npm run compile ; node ./dist/department.js

npm run compile ; node ./dist/employee.js

Step 5:
Start supergraph server.

npm run compile ; node ./dist/index.js

Step 6:
Check the supergraph running server.

http://localhost:4000/
