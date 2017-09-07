
Polaris React Component Browser is an internal tool for Macys.com developers. 
Node: install Node.js and MongoDB
1. git clone
2. mkdir dist
3. npm run build
4. npm run web
5. in another terminal window npm run server
5. point browser to http://localhost:8081/
6. Make sure MongoDB is setup and running
- in terminal window run "mongod"
- in 2nd terminal window run "mongo"

show dbs
use componentBrowserDb
show collections
db.createCollection("modules")
db.modules.find().pretty()
drop db: db.modules.drop()
