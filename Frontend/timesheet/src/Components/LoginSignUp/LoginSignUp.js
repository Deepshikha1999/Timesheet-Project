import { useState } from 'react';
import './LoginSignUp.css';
import CheckLogin from '../../main/Login';
import CreateUser from '../../main/SignUp';

function defaultJSONFormat(formFormat) {
    let keys = Object.keys(formFormat);
    const defaultFormValue = {};
    for (let k of keys) {
        defaultFormValue[k] = formFormat[k].defaultValue
    }
    return defaultFormValue;
}

export default function LoginSignUp({ typeOfForm, typeName, className, onHandleUsername, onHandleError }) {

    const defaultForm = defaultJSONFormat(typeOfForm);
    const [formData, setFormData] = useState(defaultForm);

    async function onHandleSubmit(event) {
        event.preventDefault();
        if (typeName === "LOGIN") {
            // check credentials from db
            try {
                let checkCredential = await CheckLogin(formData);
                console.log(checkCredential)
                if (checkCredential.message) {
                    onHandleUsername(checkCredential.username);
                }
                else {
                    setFormData(defaultForm);
                    onHandleError(checkCredential);
                }
            }
            catch (err) {
                console.log(err)
                setFormData(defaultForm);
                onHandleError(err);
            }

        }
        else {
            // add credentials to db
            try {
                let createUser = await CreateUser(formData);
                console.log(createUser)
                if (createUser.message) {
                    onHandleUsername(formData.username);
                }
                else {
                    setFormData(defaultForm);
                    onHandleError(createUser);
                }
            }
            catch (err) {
                console.log(err)
                setFormData(defaultForm);
                onHandleError(err);
            }
        }
    }

    function onHandleChangeValue(event) {
        const { name, value } = event.target;
        setFormData((prevForm) => {
            return {
                ...prevForm,
                [name]: value
            }
        })
    }

    // console.log(username)
    return <div className={className}>
        <form onSubmit={onHandleSubmit}>
            {Object.keys(typeOfForm).map((item, index) => {
                return <input
                    name={typeOfForm[item].name}
                    type={typeOfForm[item].type}
                    value={formData[item]}
                    required={typeOfForm[item].required}
                    onChange={onHandleChangeValue}
                    key={index}
                    className="InputPage1" />
            })}
            <button type="submit" className="SubmitPage1">{typeName}</button>
        </form>

    </div>
}