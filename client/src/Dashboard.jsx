import Side from "./Side";
import "./Dashboard.css";

function Dashboard() {
    return (
        <div>
            <Side />
            <div className="main-content">
                <h1>Admin Dashboard</h1>
            </div>
        </div>
    );
}

export default Dashboard;