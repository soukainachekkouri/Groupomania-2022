const http = require('http');
const app = require('./app');

//à chaque fois que je fais une requête j'appelle le serveur 
app.set('port', process.env.PORT || 3000)
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);