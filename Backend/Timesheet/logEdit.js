let fs = require("fs");
let path = require("path");

let writelogs = () => {
    let d = new Date();
    let currentFileName = "TaskLogs_" + d.getDate() + (parseInt(d.getMonth()) + 1) + d.getFullYear() + ".log";
    let logfilePath = path.join(process.cwd(), "logs/" + currentFileName);
    return logfilePath;
}

const logger ={
    error:function error(stmt){
        let logfilePath = writelogs();
        let d = new Date();
        let logData = '{"timestamp":"' + d + '","type":"' + 'error' + '","message":"' + stmt + '"}\n';
        fs.appendFileSync(logfilePath, logData)
    },

    info:function info(stmt){
        let logfilePath = writelogs();
        let d = new Date();
        let logData = '{"timestamp":"' + d + '","type":"' + 'info' + '","message":"' + stmt + '"}\n';
        fs.appendFileSync(logfilePath, logData)
    },

    debug:function debug(stmt){
        let logfilePath = writelogs();
        let d = new Date();
        let logData = '{"timestamp":"' + d + '","type":"' + 'debug' + '","message":"' + stmt + '"}\n';
        fs.appendFileSync(logfilePath, logData)
    }
}
 module.exports = logger;