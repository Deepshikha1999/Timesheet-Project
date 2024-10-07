const logger = require('./../logEdit');
const connector = require('./../connectionNeo4j');

let signup = async (req, res) => {
    logger.info("Inside signup");
    try {
        let inputBody = req.body;
        let username = inputBody.username;
        let orgName = inputBody.orgName;
        let password = inputBody.password;
        let emailId = inputBody.emailId;
        let mobileNo = inputBody.mobileNo;

        if (!username || !orgName || !password || !emailId || !mobileNo) {
            res.status(409).send({
                error: "Invalid or missing data. Please try again."
            })
            return;
        }

        let checkUserInDb = await checkUser(inputBody);
        if(checkUserInDb){
            res.status(409).send({
                error: "User information already exists. Please use different username/emailId/mobileNo"
            })
            return;
        }

        let user = await createUser(inputBody);
        if (!user) {
            res.status(500).send({
                error: "Error in creating user. Plese try afer sometimes"
            })
            return;
        }

        res.send({
            message: "User created successfully"
        });
        return;

    } catch (error) {
        logger.error("Error in signup");
        logger.error(error);
        res.status(500).send({
            "error": error
        })
        return;
    }
}

let checkUser = async (inputBody) => {
    let session = connector.read();
    try {
        if (!session) {
            throw 'Session not found';
        }
        logger.info("Session started for checkLogin");
        let query = "MATCH (u:User) where u.username=$username or u.emailId = $emailId or u.mobileNo = $mobileNo return u";
        logger.info("login check query: " + query);
        let dbResponse = await session.readTransaction(async function (transaction) {
            var result = await transaction.run(query, { 'username': inputBody.username, 'emailId': inputBody.emailId, 'mobileNo':inputBody.mobileNo })
            logger.debug("result: " + JSON.stringify(result))
            return result;
        })

        if (dbResponse?.records && dbResponse.records.length === 0) {
            return false;
        }

        else
            return true;
    }
    catch (error) {
        logger.info("Error in checkUser");
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


let createUser = async (inputBody) => {
    logger.info("Inside createUser")
    let session = connector.write();
    try {
        if (!session) {
            throw "Session not found in createUser";
        }
        let query = "CREATE(u:User{username:$username,password:$password,orgName:$orgName,emailId:$emailId,mobileNo:$mobileNo}) set u.createdISO=datetime() return u";
        let dbResponse = await session.writeTransaction(async function (transaction) {
            let result = await transaction.run(query, inputBody)
            return result;
        })

        logger.debug("dbResponse: " + JSON.stringify(dbResponse))
        if (dbResponse?.records && dbResponse.records.length === 0) {
            return false;
        }

        return true;
    }
    catch (error) {
        logger.error("Error in createUser");
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

exports.signup = signup;