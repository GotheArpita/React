import { useLocation } from "react-router-dom";
import Side from "./Side";
import "./Home.css";

function Home() {
  const location = useLocation();
  const username = location.state?.username;
  
  return (
    <div style={{ display: "flex" }}>
      <Side />

      <div className="main-content" >
        <h1>
          {username === "admin@gmail.com"
            ? "Welcome Admin"
            : "Welcome to Home Page"}
        </h1>
      </div>
    </div>
  );
}

export default Home;