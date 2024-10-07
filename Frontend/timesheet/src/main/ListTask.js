export default async function ListOfTask(date,username) {
    if (!date || !username) return "Invalid values. Please try again";
    const url = `http://localhost:9002/TimeSheet/listTask?ToDate=${date}&Username=${encodeURIComponent(username)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            return [];
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return `${error.message}`;
    }
}