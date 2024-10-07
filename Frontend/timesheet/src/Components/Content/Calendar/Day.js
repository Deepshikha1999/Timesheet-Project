import { sampleData } from "../../../Examples/Tasks";
import ListOfTask from "../../../main/ListTask";

export default function Days({ children, handleDate, handleLoading, keyValue, setData, username }) {
    return (
        <div className="weekdays" key={keyValue} onClick={() => {
            handleLoading(true)
            setTimeout(() => {
                handleDate((currDate) => {
                    let newDate = currDate;
                    newDate.setDate(children);
                    let key = newDate.toLocaleDateString();
                    const fetchData = async () => {
                        const data = await ListOfTask(key, username);
                        console.log(data);
                        setData(data.length !== 0 ? data : []);
                        handleLoading(false);
                    };
                    fetchData();
                    return newDate;
                })
            }, 1000);
        }}>
            {children}
        </div >
    )
}