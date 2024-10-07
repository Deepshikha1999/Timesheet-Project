import './AnalogClock.css';
import { useEffect, useState } from 'react';

export default function AnalogClock() {
    const [hoursAngle, setHoursAngle] = useState(0);
    const [minutesAngle, setMinutesAngle] = useState(0);
    const [secondsAngle, setSecondsAngle] = useState(0);
    const [time, setTime] = useState(new Date());
    const [isAnalog, setIsAnalog] = useState(true);
    useEffect(() => {
        const updateClock = () => {
            const date = new Date();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            // Calculate the rotation angle
            const angleHour = (hours % 12) * 30 + minutes * 0.5; // 30 degrees per hour, plus minute offset
            setHoursAngle(angleHour);
            const angleMin = (minutes * 6) + seconds * 0.1;
            setMinutesAngle(angleMin);
            const angleSec = (seconds * 6); // 30 degrees per second, plus milli-second offset
            setSecondsAngle(angleSec);

            setTime(date);
        };

        updateClock(); // Initial call to set the clock hand
        const intervalId = setInterval(updateClock, 1000); // Update every second

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [])

    return <div className="Analog-Clock" onMouseOver={() => setIsAnalog((a) => !a)}>
        {
            !isAnalog ? <> {time.toLocaleTimeString()} </> :
                <>
                    <div className='hours' style={{ transform: `rotate(${hoursAngle}deg)` }}></div>
                    <div className='minutes' style={{ transform: `rotate(${minutesAngle}deg)` }}></div>
                    <div className='seconds' style={{ transform: `rotate(${secondsAngle}deg)` }}></div>
                </>
        }

    </div>
}

//  style={{ transform: `rotate(${minutesAngle}deg)` }}
//  style={{ transform: `rotate(${secondsAngle}deg)` }}