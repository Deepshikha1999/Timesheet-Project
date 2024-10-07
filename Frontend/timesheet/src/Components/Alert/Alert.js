import "./Alert.css";

export default function  Alert ({message,onHandleError}){

    function handleClick(){
        onHandleError(null);
    }
    return <div className="AlertBox">
        <h2>{message}</h2>
        <button onClick={handleClick}>EXIT</button>
    </div>

}