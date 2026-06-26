import {useNavigate} from "react-router-dom";
import "./Side.css";

function Side() {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const handleLogout = () => {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        navigate("/");
    };
    return (
        <div className= "sidebar">

            <div>
                <ul className="menu">
                    {role === "admin" && (
                        <li onClick={() => navigate("/dashboard")}>
                            DASHBOARD
                        </li>
                    )}
                    <li onClick={() => navigate("/home")}>HOME</li>
                    <li onClick={() => navigate("/doctor")}>DOCTORS-LIST</li>
                    <li>PROFILE</li>
                    <li>SETTINGS</li>
                </ul>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
                LOGOUT
            </button>
        
        </div>
    );
}

export default Side;    