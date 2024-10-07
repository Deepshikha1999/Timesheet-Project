import { week } from "../../../main/CalendarConcepts";
import Days from "./Day";

export default function Month({ monthJSON, currentDate, handleDate, handleLoading, setData, username }) {
    let weeks = [];
    let dates = Object.keys(monthJSON);
    let start = 1;

    while (start <= dates.length) {
        let weekDay = [];
        for (let i = 0; i < week.indexOf(monthJSON[start]); i++) {
            weekDay.push(
                <div className="no-weekdays" key={"Empty"+ i}></div>
            )
        }
        for (let i = week.indexOf(monthJSON[start]); i < week.length; i++) {
            if (dates.length < start) break;
            if (currentDate.getDate() === start) {
                weekDay.push(
                    <div className="weekdays" key={start} id="currentDate">
                        {start}
                    </div>
                )
            }
            else {
                weekDay.push(
                    <Days handleDate={handleDate} handleLoading={handleLoading} keyValue={start} setData={setData} username={username}>{start}</Days>
                )
            }

            start++;
        }
        weeks.push(weekDay);
    }

    return (
        <div className="month">
            {/* weekHeader */}
            {week.map((item, index) => {
                return <div className="weekdays" key={item + index}>
                    {item.toUpperCase().substring(0, 3)}
                </div>
            })}
            {/* Date week wise */}
            {weeks}
        </div>
    )
}