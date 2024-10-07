import AnalogClock from './AnalogClock';
import './Header.css';
export default function Header({ username }) {
    return <div className="Header">
        <p id="Heading">MY TIME SHEET</p>
        <AnalogClock />
        <span>
            <ul>
                <li key="Username">{username ? <div className='Portfolio'>
                    {/* <img src="./../Assets/tom.png" alt="Profile" /> */}
                    {username}
                </div> : null}</li>
                <li key="Home"><a href="./Home" onClick={() => { localStorage.removeItem('username') }}>HOME</a></li>
                <li key="Logout">{localStorage.getItem('username') ? <a href="./Home" onClick={() => { localStorage.removeItem('username') }}>LOGOUT</a> : null}</li>
            </ul>
        </span>
    </div>
}