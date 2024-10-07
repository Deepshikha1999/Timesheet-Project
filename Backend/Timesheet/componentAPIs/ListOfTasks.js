const logger = require('./../logEdit');
const connector = require('./../connectionNeo4j');
const objectMapper = require('object-mapper');

let map = {
    "[].taskId": "[].TaskId",
    "[].taskStartTime":"[].StartTime",
    "[].taskEndTime":"[].EndTime",
    "[].taskDescription":"[].Task",
    "[].taskCategory":"[].Category", 
    "[].taskStatus":"[].Status", 
};
let listTheTasks = async(req,res)=>{
    try{
        let toDate = req.query.ToDate;
        let fromDate = req.query.FromDate;
        let username = req.query.Username;

        // console.log(toDate,fromDate)

        let [toDay,toMonth,toYear] = [...toDate.split("/")];
        let [fromDay,fromMonth,fromYear] = fromDate?[...fromDate.split("/")]:[null,null,null];
        
        toDay = toDay.length == 1 ? ("0" + toDay) : toDay;
        toMonth = toMonth.length == 1 ? ("0" + toMonth) : toMonth;
        // console.log(toDay,toMonth,toYear)

        let keytoDate = username+toYear+toMonth+toDay;
        let keyfromDate =  fromDate?(username+fromYear+fromMonth+fromDay):null;
        //never give fromDate if we need data from 1 date only
        if(fromDate){
            //check from date to to date
            logger.info("Fetching the date....");
            res.send("OK");
            return;
        }
        else{
            let tasks = await getTasks(keytoDate);
            for(let i=0;i<tasks.length-1;i++){
                let x = tasks[i].taskStartTime.replace(":");
                for(let j=i+1;j<tasks.length;j++){
                    let y = tasks[j].taskStartTime.replace(":");
                    if(y<=x){
                        [tasks[i],tasks[j]] = [tasks[j],tasks[i]];
                        x =  tasks[i].taskStartTime.replace(":");
                    }
                }
            }

            let mapppedResponse = objectMapper(tasks,map);
            res.send(mapppedResponse);
            return;
        }

    }
    catch(err){
        logger.error("Error in listing the tasks");
        logger.error(err);
        // console.log(err)
        res.status(500).send({
            error:err
        })
        return;
    }
}


let getTasks = async(toDateKey,fromDateKey)=>{
    let session = connector.read();
    try{
        if(!session)
        throw "Session not found";


        let query;

        if(fromDateKey){
            return "Still to process";
        }
        else{
            query = "MATCH(d:Day{dayId:$toDateKey})-[ht:HAS_TASK]->(t:Task) return t";
        }

        let dbResponse = await session.readTransaction(async function(transaction){
            let result = await transaction.run(query,{'toDateKey':toDateKey,'fromDateKey':fromDateKey});
            return result;
        })

        if(dbResponse?.records && dbResponse.records.length===0){
            throw "No Records found";
        }

        let list = [];
        for(const record of dbResponse.records){
            for(const field of record._fields){
                list.push(field.properties);
            }
        }
        return list;
    }
    catch(err){
        logger.error("Error in get Tasks");
        logger.error(err);
        throw err;
    }
    finally{
        if(session){
            session.close();
        }
    }
}

exports.listTheTasks = listTheTasks;