const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors({
  origin: "https://react-frontend-us55.onrender.com"
}));
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

app.get("/doctors", (req, res) => {
  db.all(
    "SELECT * FROM doctor WHERE DELETE_FLAG = 1",
    [],
    (err, rows) => { 
 
      if (err) {
        console.error("Error fetching doctors:", err.message);
        return res.status(500).json({
          success: false,
          message: "Error fetching doctors: " + err.message
        });
      }

      res.json({
        success: true,
        doctors: rows
      });
    }
  );
});

app.post("/doctors", (req, res) => {
  const { DOC_NAME, DESIGNATION, DESIGNATION_ID } = req.body;

  db.run(
    "INSERT INTO doctor (DOC_NAME, DESIGNATION, DESIGNATION_ID) VALUES (?, ?, ?)",
    [DOC_NAME, DESIGNATION, DESIGNATION_ID],

    function(err) {
      if (err) {
        console.error("Error inserting doctor:", err.message);

        return res.status(400).json({
          success: false,
          message: "Error adding doctor: " + err.message
        });
      }

      res.json({
        success: true,
        message: "Doctor added successfully!"
      });
    }
  );
});

// Soft Delete Doctor
app.put("/doctors/delete/:id", (req, res) => {

    const { id } = req.params;

    db.run(
        `UPDATE doctor
         SET DELETE_FLAG = 0
         WHERE DOC_ID = ?`,
        [id],
        function(err) {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Doctor not found"
                });
            }

            res.json({
                success: true,
                message: "Doctor deleted successfully"
            });

        }
    );

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
/*app.listen(5000, () => {
  console.log("Server running on port 5000");
}); This is for local development */