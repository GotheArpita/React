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
                        "admin123",
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
    }
});

module.exports = db;