import { getMonthDetails, months } from "../../../main/CalendarConcepts";
import './Calendar.css';
import { useEffect } from "react";
import Month from "./Month";
import { sampleData } from "../../../Examples/Tasks";
import ListOfTask from "../../../main/ListTask";

export default function Calendar({ currentDate, handleDate, loading, setIsLoading, setData, username }) {
    let monthDetails = getMonthDetails(currentDate);
    async function handleNewDate(IsNext) {
        setIsLoading((prevLoad) => !prevLoad)
        setTimeout(() => {
            handleDate((currDate) => {
                let newDate = currDate;
                let newMonth = IsNext ? (currDate.getMonth() === 11 ? 0 : (currDate.getMonth() + 1))
                    : (currDate.getMonth() === 0 ? 11 : (currDate.getMonth() - 1));

                let newYear = IsNext ? (currDate.getMonth() === 11 ? (currDate.getFullYear() + 1) : (currDate.getFullYear()))
                    : (currDate.getMonth() === 0 ? (currDate.getFullYear() - 1) : (currDate.getFullYear()));
                newDate.setMonth(newMonth);
                newDate.setFullYear(newYear);
                let key = newDate.toLocaleDateString();
                const fetchData = async () => {
                    const data = await ListOfTask(key, username);
                    console.log(data);
                    setData(data.length !== 0 ? data : []);
                    setIsLoading((prevLoad) => !prevLoad);
                };
                fetchData();
                return newDate;
            })
        }, 5000);

    }
    // console.log(currentDate)
    return (
        <div className="Calendar">

            <div className="movebut">
                <div className="arrow" id="left" onClick={() => handleNewDate(false)}>Prev</div>
                <div className="arrow" id="center" onClick={() => {
                    setIsLoading((prevLoad) => !prevLoad)
                    setTimeout(async () => {
                        let currDate = new Date();
                        handleDate(currDate);
                        let key = currDate.toLocaleDateString();
                        const fetchData = async () => {
                            const data = await ListOfTask(key, username);
                            console.log(data);
                            setData(data.length !== 0 ? data : []);
                            setIsLoading((prevLoad) => !prevLoad);
                        };
                        fetchData();
                    }, 5000);
                }}>Current</div>
                <div className="arrow" id="right" onClick={() => handleNewDate(true)}>Next</div>
            </div>
            <div className="monthName">{months[currentDate.getMonth().toString()] + " " + currentDate.getFullYear().toString()}</div>
            {loading && <div className="loader"></div>}
            <Month monthJSON={monthDetails} currentDate={currentDate} handleDate={handleDate} handleLoading={setIsLoading} setData={setData} username={username} />
        </div>
    )
}