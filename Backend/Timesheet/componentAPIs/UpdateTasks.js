const logger = require('./../logEdit');
const connector = require('./../connectionNeo4j');

let updateTask = async(req,res)=>{
    try{
        let inputJson = req.body;
        logger.info("inputJson: " + JSON.stringify(inputJson))
        if(!inputJson) throw "INPUT NOT FOUND";

        if(!inputJson.TaskId) throw "TaskId not found";

        let updatingTask = await updateTaskInDB(inputJson);
        if(!updatingTask) throw "Task not updated";

        res.send({
            message: "Task updated successfully"
        })

        return;
    }
    catch(err){
        logger.error("Error in updateTask");
        logger.error(err);
        res.status(500).send({
            error:err
        })
        return;
    }
}

let updateTaskInDB = async(inputJson)=>{
    let session = connector.write();
    try{
        if(!session)
        throw "Session not found";

        let query = "MATCH(t:Task{taskId:$TaskId}) "
                    + "SET t.taskDescription = $Task "
                    + "SET t.taskStartTime = $StartTime "
                    + "SET t.taskEndTime = $EndTime "
                    + "SET t.taskStatus = $Status "
                    + "RETURN t";
        let dbResponse = await session.writeTransaction(async function(transaction){
            let result = await transaction.run(query,{...inputJson});
            return result;
        })

        if(dbResponse?.records && dbResponse.records.length===0)
        throw "No records found to update";

        return true;
    }
    catch(err){
        logger.error("Error in updateTask in DB");
        logger.error(err);
        throw err;
    }
    finally{
        if(session)
        session.close();
    }
}


exports.updateTask = updateTask;