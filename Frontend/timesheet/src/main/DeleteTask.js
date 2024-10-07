export default async function DeleteTask(taskId){
    if (!taskId) return "Invalid Values. Please try again";
    const url = `http://localhost:9002/TimeSheet/deleteTask?TaskId=${taskId}`;

    try {
        const response = await fetch(url,{
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Invalid Values.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return `${error.message}`;
    }
}