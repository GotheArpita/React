import { useLocation } from "react-router-dom";
import Side from "./Side";

function Home() {
  const location = useLocation();
  const username = location.state?.username;
  
  return (
    <div style={{ display: "flex" }}>
      <Side />

      <div
        style={{
          flex: 1,
          padding: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
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