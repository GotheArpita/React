import { useEffect, useState } from "react";
import "./Doctor.css";
import Side from "./Side";

function Doctor() {
    const [doctors, setDoctors] = useState([]);
    const role = localStorage.getItem("role");
    const [showModal, setShowModal] = useState(false);

    const [newDoctor, setNewDoctor] = useState({
        DOC_NAME: "",
        DESIGNATION: "",
        DESIGNATION_ID: ""
    });

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await fetch("https://react-server-hytj.onrender.com/doctors");
            const data = await response.json();

            if (data.success) {
                setDoctors(data.doctors);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    const deleteDoctor = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this doctor?"
        );

        if (!confirmDelete) return;

            try {

                const response = await fetch(
                    `https://react-server-hytj.onrender.com/delete/${id}`,
                    {
                       method: "PUT"
                    }
                );

                const data = await response.json();

                if (data.success) {
                    alert(data.message);

                    // Refresh the table
                    fetchDoctors();
                } else {
                    alert(data.message);
                }

            } catch (error) {
                console.error("Error deleting doctor:", error);
            }

    };

    const addDoctor = async () => {

        if (
            !newDoctor.DOC_NAME ||
            !newDoctor.DESIGNATION ||
            !newDoctor.DESIGNATION_ID
            ) {
               alert("Please fill all fields");
            return;
       }

        try {

            const response = await fetch("https://react-server-hytj.onrender.com/doctors", {

               method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(newDoctor)

            });

            const data = await response.json();

                if (data.success) {

                    alert(data.message);

                    // Close popup
                    setShowModal(false);

                    // Clear form
                    setNewDoctor({
                        DOC_NAME: "",
                        DESIGNATION: "",
                        DESIGNATION_ID: ""
                    });

                    // Refresh table
                    fetchDoctors();

                } else {

                    alert(data.message);

                }

        } catch (error) {

            console.error(error);

        }

    };

    return (
        <>
            <Side />

            <div className="main-content">

                <h2>Doctor List</h2>

                {role === "admin" && (
                    <button
                        className="add-btn"
                        onClick={() => setShowModal(true)}
                    >
                    + Add Doctor
                    </button>
                )}

                <table className="doctor-table">

                    <thead>
                        <tr>
                            <th>Doctor ID</th>
                            <th>Doctor Name</th>
                            <th>Designation</th>
                            <th>Designation ID</th>

                            {role === "admin" && (
                                <th>Actions</th>
                            )}
                        </tr>
                    </thead>

                    <tbody>

                        {doctors.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={role === "admin" ? 5 : 4}
                                    style={{ textAlign: "center" }}
                                >
                                    No doctors found
                                </td>
                            </tr>
                        ) : (
                            doctors.map((doctor) => (
                                <tr key={doctor.DOC_ID}>
                                    <td>{doctor.DOC_ID}</td>
                                    <td>{doctor.DOC_NAME}</td>
                                    <td>{doctor.DESIGNATION}</td>
                                    <td>{doctor.DESIGNATION_ID}</td>

                                    {role === "admin" && (
                                        <td>
                                            <button 
                                                className="delete-btn"
                                                onClick={() => deleteDoctor(doctor.DOC_ID)}>
                                                Delete
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}

                    </tbody>

                </table>

            </div>

            {showModal && (
                <div className="modal-overlay">

                    <div className="modal">

                        <h2>Add Doctor</h2>

                        <input
                            type="text"
                            placeholder="Doctor Name"
                            value={newDoctor.DOC_NAME}
                            onChange={(e) =>
                                setNewDoctor({
                                    ...newDoctor,
                                    DOC_NAME: e.target.value
                                })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Designation"
                            value={newDoctor.DESIGNATION}
                            onChange={(e) =>
                                setNewDoctor({
                                    ...newDoctor,
                                    DESIGNATION: e.target.value
                                })
                            }
                        />

                        <input
                            type="number"
                            placeholder="Designation ID"
                            value={newDoctor.DESIGNATION_ID}
                            onChange={(e) =>
                                setNewDoctor({
                                    ...newDoctor,
                                    DESIGNATION_ID: e.target.value
                                })
                            }
                        />

                        <div className="modal-buttons">

                            <button 
                                className="save-btn"
                                onClick={addDoctor}>
                                Save
                            </button>

                            <button
                                className="cancel-btn"
                                onClick={() => setShowModal(false)}
                            >
                               Cancel
                            </button>

                        </div>

                    </div>

                </div>
            )}
        </>
    );
}

export default Doctor;