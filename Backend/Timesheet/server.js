let express = require('express');
let http = require('http');
let https = require('https');
let app = express();
let dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const logger = require('./logEdit');
let router = require("./router");

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    next();
});

let httpServer = http.createServer(app).listen(process.env.SERVER_ROOT, () => {
    console.log("Server started on port:", process.env.SERVER_ROOT);
    logger.info("Server started on port: " + process.env.SERVER_ROOT);
})

httpServer.on('connection', function (socket) {
    socket.setTimeout(36 * 60 * 1000);
});

app.get('/', (req, res) => {
    logger.info(JSON.stringify(req.headers));
    logger.info("Welcome to timesheet 1st hit");
    res.send("Connection working fine");
})
app.use(express.json());
app.use('/TimeSheet', router);
module.exports = httpServer;