import Header from '../Header/Header';
import LoginSignUp from '../LoginSignUp/LoginSignUp';
import { signup, login } from '../../Assets/Format';
import { useState, useEffect } from 'react';
import Content from '../Content/Content';
import Alert from '../Alert/Alert';

export default function Home() {
    let [username, setusername] = useState('Username');
    let [error, setError] = useState(null);
    // setting username as local storage data
    useEffect(() => {
        const savedUserName = localStorage.getItem('username');
        if (savedUserName) {
            console.log(savedUserName)
            setusername(savedUserName)
        }
    }, []);
    function setNewUsername(usernameFromInput) {
        setusername(usernameFromInput);
        // save data to local storage
        localStorage.setItem('username', usernameFromInput);
    }
    console.log(error)
    return <div className="Home">
        {username.toUpperCase() !== "USERNAME" ? <Header username={username} /> : <Header />}
        {
            error ? <Alert message={error} onHandleError={setError} /> :
                <div className="Main-Content">
                    {
                        username.toUpperCase() !== "USERNAME" ?
                            <Content username={username} /> :
                            <div className="HomePage">
                                <LoginSignUp typeOfForm={login} typeName="LOGIN" className="login" onHandleUsername={setNewUsername} onHandleError={setError} />
                                <LoginSignUp typeOfForm={signup} typeName="SIGN UP" className="signup" onHandleUsername={setNewUsername} onHandleError={setError} />
                            </div>
                    }
                </div>
        }
    </div>
}