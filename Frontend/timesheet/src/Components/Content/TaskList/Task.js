const CATEGORY = ['Work', 'Personal', 'Study', 'Entertainment', 'Health', 'Sports', 'Extra Curricular Activity', 'Passion', 'Play Time', 'House Chores', 'Food', 'Miscellenous'];

export default function Task({ data, setData, editing }) {

    function handleOnSelectEvent(e) {
        let { name, value } = e.target;
        if (name.toUpperCase() === "STATUS") {
            const checked = e.target.checked;
            if (checked)
                value = "Yes";

            else
                value = "No";
        }
        setData((oldData) => {
            return {
                ...oldData,
                [name]: value
            }
        })
    }
    return <>
        {
            Object.keys(data).map((item1, index2) => {
                if (item1.toUpperCase() === "TASKID") {
                    return <td key={'NewTab' + index2 + item1} className={item1.toUpperCase()}> {data[item1]} </td>
                }
                if (item1.toUpperCase() === 'CATEGORY') {
                    return <td key={'NewTab' + index2 + item1} className={item1.toUpperCase()}>
                        <select name={item1} value={data[item1]} onChange={handleOnSelectEvent}>
                            {(editing && editing >= 0) >= 0 ?
                                <option value={data[item1]} key={data[item1]}>
                                    {data[item1]}
                                </option> :
                                CATEGORY.map((cat, i) => {
                                    return <option value={cat} key={i}>
                                        {cat}
                                    </option>
                                })
                            }
                        </select>
                    </td>
                }

                if (item1.toUpperCase() === "STATUS") {
                    return <td key={'NewTab' + index2 + item1} className={item1.toUpperCase()}>
                        <input type='checkbox' name={item1} value='Yes' onChange={handleOnSelectEvent} className="CheckBox" checked={data[item1].toUpperCase() === "YES" ? 'checked' : undefined} />
                    </td>
                }

                if (item1.toUpperCase() === "STARTTIME" || item1.toUpperCase() === "ENDTIME") {
                    return <td key={'NewTab' + index2 + item1} className={item1.toUpperCase()}>
                        <input type='time' name={item1} value={data[item1]} onChange={handleOnSelectEvent} />
                    </td>
                }

                if (item1.toUpperCase() === "TASK") {
                    return <td key={'NewTab' + index2 + item1} className={item1.toUpperCase()}>
                        <textarea type='text' name={item1} value={data[item1]} onChange={handleOnSelectEvent} />
                    </td>
                }

                return <td key={'NewTab' + index2 + item1} className={item1.toUpperCase()}>
                    <input type='text' name={item1} value={data[item1]} onChange={handleOnSelectEvent} />
                </td>
            })
        }
    </>
}