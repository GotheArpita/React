# Hospital Management System

A full-stack Hospital Management System built using **React.js**, **Node.js**, **Express.js**, and **SQLite3**. The application implements **role-based access control**, allowing different functionalities for administrators and normal users while providing an intuitive interface for managing doctor records.

## Live Demo

**Frontend:** https://react-frontend-us55.onrender.com

## Features

### Authentication

* User Registration
* User Login
* Role-Based Access Control (Admin/User)
* Persistent login using Local Storage

### Doctor Management

* View list of doctors
* Add new doctors (Admin only)
* Soft delete doctors using a Delete Flag (Admin only)
* Deleted records remain in the database for data integrity
* Responsive doctor table with modern UI

### Role-Based Access

#### Admin

* Access to Dashboard
* Add Doctor
* Delete Doctor
* View Doctor List

#### User

* View Doctor List only
* Restricted from adding or deleting doctors

## Tech Stack

### Frontend

* React.js
* React Router DOM
* HTML5
* CSS3
* JavaScript (ES6)

### Backend

* Node.js
* Express.js
* SQLite3
* CORS

## Database

### Users Table

| Column   | Type               |
| -------- | ------------------ |
| username | TEXT (Primary Key) |
| password | TEXT               |
| name     | TEXT               |
| role     | TEXT               |

### Doctor Table

| Column         | Type                                  |
| -------------- | ------------------------------------- |
| DOC_ID         | INTEGER (Primary Key, Auto Increment) |
| DOC_NAME       | TEXT                                  |
| DESIGNATION    | TEXT                                  |
| DESIGNATION_ID | INTEGER                               |
| DELETE_FLAG    | BOOLEAN                               |

The application uses **soft delete**, where deleting a doctor only updates the `DELETE_FLAG` to `0` instead of permanently removing the record from the database.

## Project Structure

```
Hospital-Management-System
│
├── client
│   ├── src
│   │   ├── App.jsx
│   │   ├── Home.jsx
│   │   ├── Doctor.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Side.jsx
│   │   └── CSS Files
│   └── package.json
│
├── server
│   ├── db.js
│   ├── index.js
│   ├── users.db
│   └── package.json
│
└── README.md
```

## Installation

### Clone the repository

```bash
git clone https://github.com/your-username/your-repository.git
```

### Backend

```bash
cd server
npm install
npm start
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## API Endpoints

| Method | Endpoint              | Description          |
| ------ | --------------------- | -------------------- |
| POST   | `/register`           | Register a new user  |
| POST   | `/login`              | User login           |
| GET    | `/doctors`            | Fetch active doctors |
| POST   | `/doctors`            | Add a new doctor     |
| PUT    | `/doctors/delete/:id` | Soft delete a doctor |

## Future Improvements

* Password hashing using bcrypt
* JWT authentication
* Search and filter doctors
* Edit doctor details
* Profile management
* Pagination
* Appointment booking
* Patient management
* Responsive dashboard with analytics

## Author
**Arpita Gothe**

* GitHub: https://github.com/GotheArpita
* LinkedIn: https://www.linkedin.com/in/arpitagothe/
