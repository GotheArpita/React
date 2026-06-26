const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./users.db", (err) => {
    if (err) {
        console.error("Error connecting to database:", err.message);
    } else {
        console.log("Connected to SQLite database");

        db.run(`
            CREATE TABLE IF NOT EXISTS users (
               username TEXT PRIMARY KEY,
               password TEXT NOT NULL,
               name TEXT NOT NULL,
               role TEXT NOT NULL DEFAULT 'user'
            )
        `, (err) => {
            if (err) {
                console.error("Error creating table:", err.message);
            } else {
                console.log("Users table ready");

                db.run(
                    `INSERT OR IGNORE INTO users (username, password, name, role)
                     VALUES (?, ?, ?, ?)`,
                    [
                        "admin@gmail.com",
                        "12345",
                        "Admin",
                        "admin"
                    ],
                    (err) => {
                        if (err) {
                            console.error("Error creating admin:", err.message);
                        } else {
                            console.log("Default admin ready");
                        }
                    }
                );
            }
        });
        db.run(`
            CREATE TABLE IF NOT EXISTS doctor (
                DOC_ID INTEGER PRIMARY KEY AUTOINCREMENT,
                DOC_NAME TEXT NOT NULL,
                DESIGNATION TEXT NOT NULL,
                DESIGNATION_ID INTEGER NOT NULL,
                DELETE_FLAG INTEGER DEFAULT 1
            )
        `, (err) => {
            if (err) {
                console.error("Error creating doctor table:", err.message);
            } else {
                console.log("Doctor table ready");

                db.run(
                    `INSERT OR IGNORE INTO doctor
                    (DOC_ID, DOC_NAME, DESIGNATION, DESIGNATION_ID, DELETE_FLAG)
                    VALUES (?, ?, ?, ?, ?)`,
                    [1, "Dr. Amit Sharma", "Physician", 101, 1]
                );

                db.run(
                    `INSERT OR IGNORE INTO doctor
                    (DOC_ID, DOC_NAME, DESIGNATION, DESIGNATION_ID, DELETE_FLAG)
                    VALUES (?, ?, ?, ?, ?)`,
                    [1, "Dr. Amit Sharma", "Physician", 101, 1]
                );

                db.run(
                    `INSERT OR IGNORE INTO doctor
                    (DOC_ID, DOC_NAME, DESIGNATION, DESIGNATION_ID, DELETE_FLAG)
                    VALUES (?, ?, ?, ?, ?)`,
                    [2, "Dr. Priya Patil", "Cardiologist", 102, 1]
                );

                db.run(
                    `INSERT OR IGNORE INTO doctor
                    (DOC_ID, DOC_NAME, DESIGNATION, DESIGNATION_ID, DELETE_FLAG)
                    VALUES (?, ?, ?, ?, ?)`,
                    [3, "Dr. Rahul Mehta", "Neurologist", 103, 1]
                );

            }
        });
    }
});

module.exports = db;