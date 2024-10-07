const logger = require('./../logEdit');
const connector = require('./../connectionNeo4j');

let login = async (req, res) => {
    try {

        let username = req?.query?.Username ? req.query.Username : null;
        let password = req?.query?.Password ? req.query.Password : null;

        if (!username) {
            res.status(409).send({
                "error": "Invalid username"
            })
            return;
        }

        if (!password) {
            res.status(409).send({
                "error": "Invalid passowrd"
            })
            return;
        }
        logger.info("Input values: " + username + " " + password);
        let loginCheck = await checkLogin(username, password);
        if (loginCheck) {
            res.send({
                message: "Match found for User",
                username: loginCheck
            })
            return;
        }
        else {
            res.status(404).send({
                error: "Match not found for user"
            })
        }
    } catch (error) {
        logger.info("Error in login");
        logger.error(error);
        res.status(500).send({
            "error": error
        })
        return;
    }
}

let checkLogin = async (username, password) => {
    logger.info("Input values1: " + username);
    let session = connector.read();
    try {
        if (!session) {
            throw 'Session not found';
        }
        logger.info("Session started for checkLogin");
        let query = "MATCH (u:User) where (u.username=$username or u.emailId = $username or u.mobileNo = $username) and u.password = $password return u.username";
        logger.info("login check query: " + query);
        let dbResponse = await session.readTransaction(async function (transaction) {
            var result = await transaction.run(query, { 'username': username, 'password': password })
            logger.debug("result: " + JSON.stringify(result))
            return result;
        })

        if (dbResponse?.records && dbResponse.records.length === 0) {
            return false;
        }

        else
            return dbResponse.records[0]._fields[0];
    }
    catch (error) {
        logger.info("Error in checkLogin");
        logger.error(error);
        throw {
            "error": error
        }
    }
    finally {
        if (session)
            session.close();
    }

}

exports.login = login;