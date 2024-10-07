const logger = require('./../logEdit');
const connector = require('./../connectionNeo4j');
const Constants = require('./Constants')
const MONTH = Constants.MONTHS;
const WEEKS = Constants.WEEKS;
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
let create = async (req, res) => {
    try {
        let inputBody = req.body;
        let fulldate = Object.keys(inputBody)[0];
        inputBody = inputBody[fulldate];
        let [date, month, year] = [...fulldate.split("/")];
        date = date.length == 1 ? ("0" + date) : date;
        month = month.length == 1 ? ("0" + month) : month;
        // console.log(JSON.stringify(inputBody))
        let username = inputBody.username;
        if (!username) {
            res.status(404).send({
                error: "Username not found"
            })
            return;
        }
        let s = new Date();
        if ((date < s.getDate() && (month - 1) <= s.getMonth() && year <= s.getFullYear()) || ((month - 1) < s.getMonth() && year <= s.getFullYear()) || (year < s.getFullYear())) {
            res.status(404).send({
                error: "Invalid to schedule for previous dates"
            })
            return;
        }

        let yearId = await checkAndCreateYear(username, year);
        if (!yearId) throw "Error in creating Year node.";

        let monthId = await checkAndCreateMonth(yearId, month);
        if (!monthId) throw "Error in creating Month node.";


        s.setDate(date);
        s.setMonth(month - 1);
        s.setFullYear(year)
        let day = WEEKS[s.getDay()];

        let dayId = await checkAndCreateDay(monthId, date, day);
        if (!dayId) throw "Error in creating Say node.";

        let taskId = await readTaskId(inputBody.category);
        if (!taskId) throw "Error in getting SerialNo";

        let serialNo = parseInt(taskId.substring(3, taskId.length)) + 1;
        let newTaskId = taskId.substring(0, 3) + serialNo;

        let task = await createTask(dayId, inputBody, newTaskId);
        if (!task) throw "Error in task creation";

        let taskIdUpdate = await updateTaskId(serialNo, inputBody.category);
        if (!taskIdUpdate) throw "Error in updating task Id";

        res.send({
            message: "task Created Successfully",
            taskId: newTaskId
        });
    }
    catch (err) {
        logger.error("Error in create Task");
        logger.error(err)
        // console.log(err)
        res.status(500).send({
            error: err
        });
        return;
    }
}

let checkAndCreateYear = async (username, year) => {
    let session = connector.write();
    try {
        if (!session)
            throw "Session not found";

        let yearId = username + year;
        let readYearQuery = "Match (u:User)-[hy:HAS_YEAR]->(y:Year) where u.username=$username and y.yearId=$yearId return u,hy,y";
        let dbResponse = await session.readTransaction(async function (transaction) {
            let result = await transaction.run(readYearQuery, { 'username': username, 'yearId': yearId })
            return result;
        })

        if (dbResponse?.records && dbResponse.records.length == 0) {
            let writeYearQuery = "MATCH (u:User{username:$username}) " +
                "MERGE (y:Year{yearId:$yearId,year:$year}) " +
                "MERGE (u)-[hy:HAS_YEAR]->(y) " +
                "RETURN u,hy,y";

            dbResponse = await session.writeTransaction(async function (transaction) {
                let result = await transaction.run(writeYearQuery, { 'username': username, 'yearId': yearId, 'year': year });
                return result;
            })
            if (dbResponse?.records && dbResponse.records.length == 0) {
                throw "Error in creating Year node.";
            }
            else {
                return yearId;
            }
        }
        else {
            return yearId;
        }
    }
    catch (err) {
        logger.error("Error in checkAndCreateYear");
        logger.error(err);
        throw err;
    }
    finally {
        if (session)
            session.close();
    }
}

let checkAndCreateMonth = async (yearId, month) => {
    let session = connector.write();
    try {
        if (!session)
            throw "Session not found";

        let monthId = yearId + month;
        let readMonthQuery = "Match (y:Year)-[hm:HAS_MONTH]->(m:Month) where y.yearId=$yearId and m.monthId=$monthId return y,hm,m";
        let dbResponse = await session.readTransaction(async function (transaction) {
            let result = await transaction.run(readMonthQuery, { 'yearId': yearId, 'monthId': monthId })
            return result;
        })

        if (dbResponse?.records && dbResponse.records.length == 0) {
            let writeMonthQuery = "MATCH (y:Year{yearId:$yearId}) " +
                "MERGE (m:Month{monthId:$monthId,monthNo:$month,monthName:$monthName}) " +
                "MERGE (y)-[hm:HAS_MONTH]->(m) " +
                "RETURN y,hm,m";

            dbResponse = await session.writeTransaction(async function (transaction) {
                let result = await transaction.run(writeMonthQuery, { 'monthId': monthId, 'yearId': yearId, 'month': month, 'monthName': MONTHS[month - 1] });
                return result;
            })
            if (dbResponse?.records && dbResponse.records.length == 0) {
                throw "Error in creating Month node.";
            }
            else {
                return monthId;
            }
        }
        else {
            return monthId;
        }
    }
    catch (err) {
        logger.error("Error in checkAndCreateMonth");
        logger.error(err);
        throw err;
    }
    finally {
        if (session)
            session.close();
    }
}

let checkAndCreateDay = async (monthId, date, day) => {
    let session = connector.write();
    try {
        if (!session)
            throw "Session not found";

        let dayId = monthId + date;
        let readDayQuery = "Match (m:Month)-[hd:HAS_DATE]->(d:day) where m.monthId=$monthId and d.dayId = $dayId return m,hd,d";
        let dbResponse = await session.readTransaction(async function (transaction) {
            let result = await transaction.run(readDayQuery, { 'monthId': monthId, 'dayId': dayId })
            return result;
        })

        if (dbResponse?.records && dbResponse.records.length == 0) {
            let writeDayQuery = "MATCH (m:Month{monthId:$monthId}) " +
                "MERGE (d:Day{dayId:$dayId,date:$date,day:$day}) " +
                "MERGE (m)-[hd:HAS_DAY]->(d) " +
                "RETURN m,hd,d";

            dbResponse = await session.writeTransaction(async function (transaction) {
                let result = await transaction.run(writeDayQuery, { 'monthId': monthId, 'dayId': dayId, 'date': date, 'day': day });
                return result;
            })
            if (dbResponse?.records && dbResponse.records.length == 0) {
                throw "Error in creating Day node.";
            }
            else {
                return dayId;
            }
        }
        else {
            return dayId;
        }
    }
    catch (err) {
        logger.error("Error in checkAndCreateDay");
        logger.error(err);
        throw err;
    }
    finally {
        if (session)
            session.close();
    }
}

let readTaskId = async (category) => {
    let session = connector.read();
    try {
        if (!session)
            throw "Session not found";

        let query = "MATCH(tc:TaskCategroy) where tc.categoryId=$category return tc.abbrev+tc.serialNo";
        let dbResponse = await session.readTransaction(async function (transaction) {
            let result = await transaction.run(query, { 'category': category.toUpperCase() });
            return result;
        })
        if (dbResponse?.records && dbResponse.records.length === 0) {
            throw "No such categories found";
        }
        let serialNo = dbResponse.records[0]._fields[0];
        if (serialNo.low)
            serialNo = serialNo.low;

        return serialNo;
    }
    catch (err) {
        logger.error("Error in creatTaskId");
        logger.error(err);
        throw err;
    }
    finally {
        if (session)
            session.close();
    }
}

let createTask = async (dayId, inputJson, taskId) => {
    let session = connector.write();
    try {
        if (!session)
            throw "Session not found";

        let query = "MATCH(d:Day{dayId:$dayId}) "
            + "MERGE(t:Task{taskId:$taskId,taskDescription:$task,taskStartTime:$startTime,taskEndTime:$endTime,taskStatus:$status,taskCategory:$category}) "
            + "MERGE(d)-[ht:HAS_TASK{createdISO:datetime()}]-(t) return d,ht,t";

        let dbResponse = await session.writeTransaction(async function (transaction) {
            let result = await transaction.run(query, { ...inputJson, 'dayId': dayId, 'taskId': taskId });
            return result;
        })
        if (dbResponse?.records && dbResponse.records.length === 0) {
            throw "No records created. Please try again";
        }

        return true;
    }
    catch (err) {
        logger.error("Error in creating task");
        logger.error(err);
        throw err;
    }
    finally {
        if (session)
            session.close();
    }
}

let updateTaskId = async (serialNo, category) => {
    let session = connector.write();
    try {
        if (!session)
            throw "Session not found";

        let query = "MATCH(tc:TaskCategroy) where tc.categoryId=$category set tc.serialNo=$serialNo return tc";

        let dbResponse = await session.writeTransaction(async function (transaction) {
            let result = await transaction.run(query, { 'serialNo': serialNo, 'category': category.toUpperCase() });
            return result;
        })

        if (dbResponse?.records && dbResponse.records.length === 0) {
            throw "Task id not updated";
        }

        return true;
    }
    catch (err) {
        logger.error("Error in updating task id");
        logger.error(err);
        throw err;
    }
    finally {
        if (session)
            session.close();
    }
}

exports.create = create;