const logger = require('./../logEdit');
const connector = require('./../connectionNeo4j');

let deleteTask = async(req,res)=>{
    try{
        let taskId = req.query.TaskId;
        if(!taskId) throw "Invalid Values";
        await deleteIt(taskId);

        res.send({
            message: taskId + " deleted successfully"
        })
        return;
    }
    catch(err){
        logger.error("Error in delete task");
        logger .error(err);
        res.status(500).send({
            "error": err
        })
        return;
    }
}

let deleteIt = async(taskId)=>{
    let session = connector.write();
    try{
        if(!session)
        throw "Session not found";

        let query = "MATCH(t:Task) where t.taskId=$taskId detach delete t";
        let dbResponse = await session.writeTransaction(async function(transaction){
            let result = await transaction.run(query,{'taskId':taskId});
            return result;
        })
    }
    catch(err){
        logger.error("Error in delete it");
        logger.error(err);
        throw err;
    }
    finally{
        if(session)
        session.close();
    }
}

exports.deleteTask = deleteTask;