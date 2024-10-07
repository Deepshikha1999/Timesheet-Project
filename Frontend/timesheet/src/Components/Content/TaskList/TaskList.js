import DeleteTask from "../../../main/DeleteTask";
import ListOfTask from "../../../main/ListTask";
import EditTask from "./EditTask";
import NewTask from "./NewTask";
import "./TaskList.css";
import { useState } from 'react';
const DEFAULT_VAL = {
    'taskId' : '0001',
    'startTime': 'Start Time',
    'endTime': 'End Time',
    'task': 'Task Description',
    'category': 'Work',
    'status': 'No'
}

const TABLE_HEADER = ['TaskId','Start Time', 'End Time', 'Task', 'Category', 'Status'];

export default function TaskList({ currentDate, loading, tasks, setTask,username,setIsLoading }) {
    const [isEditing, setEditing] = useState(-1);
    // console.log("insideTaskLists",tasks)
    function handleOnDelete(index) {
        setIsLoading(true);
        let data = tasks[index];
        console.log(data)
        setTimeout(()=>{
            const key = currentDate.toLocaleDateString();
            let deleteTask = async () => {
                let deleteTask = await DeleteTask(data.TaskId);
                const fetchData = await ListOfTask(key, username);
                console.log(fetchData);
                setTask(fetchData);
                setIsLoading(false);
            }
            deleteTask();
        },2000)
    }

    function handleOnEdit(index) {
        setEditing(index);
    }

    return (<div className="TaskList">
        <div className="TaskList-Header">{!loading ? currentDate.toDateString() : <div className="loader"></div>}</div>
        <table className="Table">
            <thead>
                <tr className="Table-Header">
                    {TABLE_HEADER.map((item, index) => {
                        return <th key={index} id={"heading" + index}>
                            {item}
                        </th>
                    })}
                </tr>
            </thead>
            <tbody>
                {
                    !loading && tasks && tasks.length>=0? tasks.map((item, index1) => {
                        if (index1 === isEditing) {
                            return <EditTask handleTasks={setTask} defaultValue={item} editing={isEditing} handleEditing={setEditing} setIsLoading={setIsLoading} currentDate={currentDate} username={username}/>
                        }
                        else {
                            return <tr className="Table-Content" key={index1}>
                                {
                                    Object.keys(item).map((item1, index2) => {
                                        return <td key={index1 + "" + index2} className={item1.toUpperCase()}> {item[item1]} </td>
                                    })
                                }
                                <td key={'Edit'} className='Edit'> <button onClick={() => handleOnEdit(index1)}>EDIT</button> </td>
                                <td key={'Delete'} className='Delete'> <button onClick={() => { handleOnDelete(index1) }}>DELETE</button> </td>
                            </tr>
                        }
                    }) : <div className="loader"></div>
                }
                <NewTask handleTasks={setTask} defaultValue={DEFAULT_VAL} currentDate={currentDate} username={username} setIsLoading={setIsLoading}/>

            </tbody>

        </table>
        {/* <button className="AddButton">ADD MORE TASK</button> */}
    </div>)
}