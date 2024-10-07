export default async function UpdateTasks(inputJSON){
    if (!inputJSON) return "Invalid values. Please try again";
    const url = `http://localhost:9002/TimeSheet/updateTask`;
    console.log("input: " , JSON.stringify(inputJSON))
    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputJSON),
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