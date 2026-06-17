const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/*Create user*/
app.post("/register", (req, res) => {
  const { name, username, password } = req.body;
  
  db.run(
    "INSERT INTO users (username, password, name) VALUES (?, ?, ?)",
    [username, password, name],
    function(err) {
      if (err) {
        console.error("Error inserting user:", err.message);

        return res.status(400).json({
          success: false,
          message: "Error creating user: " + err.message
        });
      }

      res.json({
        success: true,
        message: "Username and password have been created successfully!"
      });
    }
  );
});

/*login*/
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, row) => {
      if (err) {
        console.error("Error fetching user:", err.message);
        
        return res.status(500).json({
          success: false,
          message: "Error logging in: " + err.message
        });
      }

      if (row) {
        res.json({
          success: true,
          message: "Login Successful",
          username: row.username,
          role: row.role,
        });
      } else {
        res.json({
          success: false,
          message: "Invalid Username or Password",
        });
      }
    }
  );
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});