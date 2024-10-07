import { useState } from 'react';
import Task from './Task';
import UpdateTasks from '../../../main/UpdateTask';
import ListOfTask from '../../../main/ListTask';

export default function EditTask({ handleTasks, defaultValue, editing, handleEditing,setIsLoading,currentDate,username }) {
    const [data, setData] = useState(defaultValue);
    async function handleOnClick() {
        setIsLoading(true);
        setTimeout(()=>{
            const key = currentDate.toLocaleDateString();
            console.log(data)
            let updateTask = async()=>{
                let updatetask = await UpdateTasks(data);
                const fetchData = await ListOfTask(key, username);
                console.log(fetchData);
                handleTasks(fetchData);
                handleEditing(-1);
                setIsLoading(false);
            }
            updateTask();
        },2000)
         // handleTasks((oldTasks) => {
            //     let newRecord = [...oldTasks];
            //     newRecord[editing] = data;
            //     return newRecord
            // })
            
    }

    return (
        <tr className="Table-Content" key={'NewTab' + (editing ? editing : "")}>
            <Task data={data} setData={setData} editing={editing}/>
            <td key={'Save'} className='Save'> <button onClick={handleOnClick}>SAVE</button> </td>
            <td key={'Delete'} className='Delete'> <button>DELETE</button> </td>
        </tr>
    )
}