import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://react-server-hytj.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", data.role);

        navigate("/home", {
          state: {
            username: data.username,
            role: data.role,
          }
        });
      } else {
        alert("Invalid Username or Password");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  const handleRegister = async (e) => { 
    e.preventDefault();

    try {
      const response = await fetch("https://react-server-hytj.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Account Created Successfully!");

        setName("");
        setUsername("");
        setPassword("");

        setIsRegister(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
        console.error(error);
        alert("Server Error");
    }
  };

  return (
  <div className="login-container">
    <div className="login-card">

      <h2 className="login-title">
        {isRegister ? "Create Account" : "Login"}
      </h2>

      {!isRegister ? (
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Username</label>

            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="login-btn" type="submit">
            Login
          </button>

          <p className="create-user">
            New user?{" "}
            <span onClick={() => setIsRegister(true)}>
              Create an account
            </span>
          </p>

        </form>
      ) : (
        <form onSubmit={handleRegister}>

          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Username</label>

            <input
              type="text"
              placeholder="Choose Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="login-btn" type="submit">
            Create Account
          </button>

          <p className="create-user">
            Already have an account?{" "}
            <span onClick={() => setIsRegister(false)}>
              Login
            </span>
          </p>

        </form>
      )}

    </div>
  </div>);
}

export default App;