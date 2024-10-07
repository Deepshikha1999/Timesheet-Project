let logger = require("./logEdit")
let neo4j = require("neo4j-driver")

//npm install neo4j-driver --save
// no userId and password as of now

let createDriver = () => {
    //virtualurl,userid,password,address
    return neo4j.driver("neo4j://localhost:7687",neo4j.auth.basic("neo4j", "deepshikha"));
}

let access = {
    read: function () {
        try {
            logger.info("session started for read")
            let session = createDriver().session({
                database: "neo4j",
                defaultAccessMode: neo4j.session.READ
            })
            logger.info("Connection done")
            return session;
        }
        catch (err) {
            logger.error("Error in neo4j connection");
            logger.error(err);
        }
    },
    write: function () {
        try {
            logger.info("session started for write")
            let session = createDriver().session({
                database: "neo4j",
                defaultAccessMode: neo4j.session.WRITE
            })
            logger.info("Connection done")
            return session;
        }
        catch (err) {
            logger.error("Error in neo4j connection");
            logger.error(err);
        }
    }
}

module.exports = access;