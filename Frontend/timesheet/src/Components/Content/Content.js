import Calendar from './Calendar/Calendar'
import './Content.css';
import { useState, useEffect } from 'react';
import Status from './Status/Status';
import TaskList from './TaskList/TaskList';
// import { sampleData } from '../../Examples/Tasks';
import ListOfTask from "../../main/ListTask";

export default function Content({ username }) {
    const [loading, setIsLoading] = useState(false);
    const [currentDate, setDate] = useState(new Date());
    // console.log(currentDate.toLocaleDateString())
    const [tasks, setTask] = useState([]);
    // Function to update the tasks based on currentDate
    const updateTasks = () => {
        if (currentDate) { // Only execute if currentDate is a Date object
            const key = currentDate.toLocaleDateString();
            const fetchData = async () => {
                const data = await ListOfTask(key, username);
                console.log(data);
                setTask(data.length !== 0 ? data : []);
            };
            fetchData();
        }
    };

    // Call updateTasks after the initial state is set
    useEffect(() => {
        setTimeout(()=>{
            updateTasks();
        },2000)
    }, [currentDate]);

    // Log the formatted date after the state is updated
    useEffect(() => {
        console.log(currentDate.toLocaleDateString());
    }, [currentDate]);
    return <div className="Content">
        <div className="Calendar-Status">
            {/* Calendar */}
            <Calendar currentDate={currentDate} handleDate={setDate} loading={loading} setIsLoading={setIsLoading} setData={setTask} username={username} />
            {/* Status */}
            <Status username={username}/>
        </div>
        <div className="List-Task">
            {/* List */}
            <TaskList currentDate={currentDate} loading={loading} tasks={tasks} setTask={setTask} username={username} setIsLoading={setIsLoading}/>
        </div>
    </div>
}