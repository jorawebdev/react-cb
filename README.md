
Polaris React Component Browser is an internal tool for Macys.com developers. 
Node: install Node.js and MongoDB
1. git clone
2. mkdir dist
3. npm install
4. npm run build
5. npm run web
6. in another terminal window npm run server
7. point browser to http://localhost:8081/
8. Make sure MongoDB is setup and running
- in terminal window run "mongod"
- in 2nd terminal window run "mongo"

show dbs
use componentBrowserDb
show collections
db.createCollection("modules")
db.modules.find().pretty()
drop db: db.modules.drop()
