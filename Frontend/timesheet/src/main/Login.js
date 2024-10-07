export default async function CheckLogin(formData) {
    if (!formData?.username || !formData?.password) return "Invalid Credentials. Please try again";
    const url = `http://localhost:9002/TimeSheet/login?Username=${encodeURIComponent(formData.username)}&Password=${encodeURIComponent(formData.password)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Invalid Credentials.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return `${error.message}`;
    }
}