export default function ShowEvents({ tasks,bg,className }) {
    return <table>
        {
            tasks.map((item,index) => {
                return <tr key={index} style={{backgroundColor:`${bg}`}} className={className}>
                    <td>{item.StartTime+" - "+item.EndTime + "   " + item.Task}</td>
                </tr>
            })
        }
    </table>
}