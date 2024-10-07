const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let getMonthDetails = (currDate) => {
    if(currDate){
        let currMonthMap = {};
        let prevDate = new Date(currDate);
        let nextDate = new Date(currDate);
        let flag = true;
    
        currMonthMap[currDate.getDate()] = week[currDate.getDay()];
    
        while (flag) {
            prevDate.setDate(prevDate.getDate() - 1);
            nextDate.setDate(nextDate.getDate() + 1);
    
            if (prevDate.getMonth() !== currDate.getMonth() && nextDate.getMonth() !== currDate.getMonth())
                break;
    
            if (prevDate.getMonth() === currDate.getMonth()) currMonthMap[prevDate.getDate()] = week[prevDate.getDay()];
    
            if (nextDate.getMonth() === currDate.getMonth()) currMonthMap[nextDate.getDate()] = week[nextDate.getDay()];
        }
    
        return currMonthMap;
    }
   return null;
}

exports.getMonthDetails = getMonthDetails;
exports.week = week;
exports.months = months;