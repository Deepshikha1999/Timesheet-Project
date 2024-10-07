export default async function CreateTask(inputTask,currentDate,username){
    if (!inputTask) return "Invalid Credentials. Please try again";
    const url = `http://localhost:9002/TimeSheet/createTask`;
    const dateInFormat = currentDate.toLocaleDateString();
    let formattedInput = {};
    formattedInput[dateInFormat] = {...inputTask,'username':username};
    console.log(JSON.stringify(formattedInput))
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedInput),
        });
        if (!response.ok) {
            console.log(Object.keys(response))
            throw new Error('Invalid values. Try again.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return `${error.message}`;
    }
}