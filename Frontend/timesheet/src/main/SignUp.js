export default async function CreateUser(formData) {
    if (!formData?.username || !formData?.password) return "Invalid Credentials. Please try again";
    const url = `http://localhost:9002/TimeSheet/signup`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            console.log(Object.keys(response))
            throw new Error('Invalid values.Try again.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return `${error.message}`;
    }
}