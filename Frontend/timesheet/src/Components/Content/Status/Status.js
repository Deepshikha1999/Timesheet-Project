import ListOfTask from '../../../main/ListTask';
import './Status.css';
import { useState, useEffect } from 'react';
import ShowEvents from './ShowEvents';

export default function Status({username}) {
    const [currentDate,setCurrentDate] = useState(new Date());
    const [data,setData] = useState({
        currentTask:[],
        nextTask:[]
    });
    useEffect(()=>{
        setTimeout(()=>{
            let key = currentDate.toLocaleDateString();
            let listOfTask = async()=>{
                let tasks = await ListOfTask(key,username);
                let hour = currentDate.getHours();
                // let min = currentDate.getMinutes();
                let data = {};
                let currentTask = [];
                let nextTask = [];
                for(let task of tasks){
                    let startTime = task.StartTime.split(":");
                    let endTime = task.EndTime.split(":");
                    if(hour<=endTime[0] && hour>=startTime[0]){
                        currentTask.push(task)
                    }
                    if(startTime[0]>hour){
                        nextTask.push(task)
                        break;
                    }
                }
                data.currentTask = currentTask;
                data.nextTask = nextTask;
                setData(data);
            }
            listOfTask();
        },1000)
    })
    return (
        <div className="Status">
            <div className="Status-Block"> <ShowEvents tasks={data.currentTask} bg="rgba(58, 78, 58, 0.474)" className="CurrentTask"/></div>
            <div className="Status-Block"><ShowEvents tasks={data.nextTask} bg="slategrey" className="NextTask"/></div>
            {/* <div className="Status-Block">Day Status</div>
            <div className="Status-Block">Week Status</div>
            <div className="Status-Block">Month Status</div> */}
        </div>
    )
}

// style={{ transform: `rotate(${hoursAngle}deg)` }}