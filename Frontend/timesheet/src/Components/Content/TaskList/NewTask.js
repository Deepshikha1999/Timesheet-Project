import { useState } from 'react';
import Task from './Task';
import CreateTask from '../../../main/CreateTask';
import ListOfTask from '../../../main/ListTask';

export default function NewTask({ handleTasks, defaultValue, currentDate, username, setIsLoading }) {
    const [data, setData] = useState(defaultValue);

    async function handleOnClick() {
        setIsLoading(true);
        setTimeout(() => {
            const key = currentDate.toLocaleDateString();
            let createTaskInDB = async () => {
                let create = await CreateTask(data, currentDate, username);
                const fetchData = await ListOfTask(key, username);
                console.log(fetchData);
                handleTasks(fetchData);
                setIsLoading(false);
            }
            createTaskInDB();
            setData(defaultValue);
        }, 2000)

    }

    return (
        <tr className="Table-Content" key={'NewTab'}>
            <Task data={data} setData={setData} />
            <td key={'Save'} className='Save'> <button onClick={handleOnClick}>ADD TASK</button> </td>
        </tr>
    )
}