import { useState, useEffect, useCallback } from "react";
import "./Components.css"

export default function CustomerDetailsButton({ customer }) {
    const [isOpen, setIsOpen] = useState(false);
    const [rentals, setRentals] = useState([]);
    const [loadingRentals, setLoadingRentals] = useState(false);
    const [showRentInput, setShowRentInput] = useState(false);
    const [filmId, setFilmId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showReturnConfirm, setShowReturnConfirm] = useState(false);
    const [rentalToReturn, setRentalToReturn] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editFirstName, setEditFirstName] = useState("");
    const [editLastName, setEditLastName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const fetchRentals = useCallback(() => {
        setLoadingRentals(true);
        fetch(`http://localhost:3001/api/customers/${customer.customer_id}/rentals`)
            .then((res) => res.json())
            .then((data) => {
                setRentals(data);
                setLoadingRentals(false);
            })
            .catch((err) => {
                console.error("Error fetching rentals:", err);
                setLoadingRentals(false);
            });
    }, [customer.customer_id]);

    useEffect(() => {
        if (isOpen) {
            fetchRentals();
        }
    }, [isOpen, fetchRentals]);

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const handleRent = () => {
        setShowRentInput(true);
        setError("");
        setSuccess("");
    };

    const handleSubmitRental = () => {
        if (!filmId.trim()) {
            setError("Please enter a film ID");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        fetch("http://localhost:3001/api/rentals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                customer_id: customer.customer_id,
                film_id: filmId,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                if (data.success) {
                    setSuccess("Rental created successfully!");
                    fetchRentals(); // Refresh rental history
                    setTimeout(() => {
                        setFilmId("");
                        setShowRentInput(false);
                        setSuccess("");
                    }, 1500);
                } else {
                    setError(data.error || "Failed to create rental");
                }
            })
            .catch((err) => {
                setLoading(false);
                setError("Error creating rental: " + err.message);
            });
    };

    const handleCancelRental = () => {
        setFilmId("");
        setShowRentInput(false);
        setError("");
        setSuccess("");
    };

    const handleReturn = (rental) => {
        setRentalToReturn(rental);
        setShowReturnConfirm(true);
    };

    const confirmReturn = () => {
        if (!rentalToReturn) return;

        fetch(`http://localhost:3001/api/rentals/${rentalToReturn.rental_id}/return`, {
            method: "PUT",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    fetchRentals(); // Refresh rental history
                    setShowReturnConfirm(false);
                    setRentalToReturn(null);
                } else {
                    alert(data.error || "Failed to return rental");
                }
            })
            .catch((err) => {
                alert("Error returning rental: " + err.message);
            });
    };

    const cancelReturn = () => {
        setShowReturnConfirm(false);
        setRentalToReturn(null);
    };

    const handleEdit = () => {
        setEditFirstName(customer.first_name);
        setEditLastName(customer.last_name);
        setEditEmail(customer.email);
        setIsEditing(true);
        setError("");
        setSuccess("");
    };

    const handleSaveEdit = () => {
        if (!editFirstName.trim() || !editLastName.trim() || !editEmail.trim()) {
            setError("All fields are required");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(editEmail)) {
            setError("Please enter a valid email address");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        fetch(`http://localhost:3001/api/customers/${customer.customer_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name: editFirstName,
                last_name: editLastName,
                email: editEmail,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                if (data.success) {
                    setSuccess("Customer updated successfully!");
                    customer.first_name = editFirstName;
                    customer.last_name = editLastName;
                    customer.email = editEmail;
                    setTimeout(() => {
                        setIsEditing(false);
                        setSuccess("");
                    }, 1500);
                } else {
                    setError(data.error || "Failed to update customer");
                }
            })
            .catch((err) => {
                setLoading(false);
                setError("Error updating customer: " + err.message);
            });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setError("");
        setSuccess("");
    };

    const handleDelete = () => {
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        setDeleting(true);
        fetch(`http://localhost:3001/api/customers/${customer.customer_id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                setDeleting(false);
                if (data.success) {
                    alert("Customer deleted successfully!");
                    setIsOpen(false);
                    window.location.reload();
                } else {
                    alert(data.error || "Failed to delete customer");
                }
            })
            .catch((err) => {
                setDeleting(false);
                alert("Error deleting customer: " + err.message);
            });
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(false);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="view-details-button"
            >
                View Details
            </button >

            {isOpen && (
                <div className="outer-overlay">
                    <div className="inner-overlay">
                        <div style={{ textAlign: "left" }}>

                            <p><strong>Customer ID:</strong> {customer.customer_id}</p>

                            {!isEditing ? (
                                <>
                                    <p><strong>Name: </strong>{customer.first_name} {customer.last_name}</p>
                                    <p><strong>Email: </strong>{customer.email} </p>
                                </>
                            ) : (
                                <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                                    <label htmlFor="editFirstName" style={{ display: "block", marginBottom: "0.5rem" }}>
                                        <strong>First Name:</strong>
                                    </label>
                                    <input
                                        id="editFirstName"
                                        type="text"
                                        value={editFirstName}
                                        onChange={(e) => setEditFirstName(e.target.value)}
                                        placeholder="Enter first name"
                                        disabled={loading}
                                        style={{
                                            width: "100%",
                                            padding: "0.5rem",
                                            fontSize: "1rem",
                                            borderRadius: "5px",
                                            border: "1px solid #ccc",
                                            marginBottom: "1rem"
                                        }}
                                    />

                                    <label htmlFor="editLastName" style={{ display: "block", marginBottom: "0.5rem" }}>
                                        <strong>Last Name:</strong>
                                    </label>
                                    <input
                                        id="editLastName"
                                        type="text"
                                        value={editLastName}
                                        onChange={(e) => setEditLastName(e.target.value)}
                                        placeholder="Enter last name"
                                        disabled={loading}
                                        style={{
                                            width: "100%",
                                            padding: "0.5rem",
                                            fontSize: "1rem",
                                            borderRadius: "5px",
                                            border: "1px solid #ccc",
                                            marginBottom: "1rem"
                                        }}
                                    />

                                    <label htmlFor="editEmail" style={{ display: "block", marginBottom: "0.5rem" }}>
                                        <strong>Email:</strong>
                                    </label>
                                    <input
                                        id="editEmail"
                                        type="email"
                                        value={editEmail}
                                        onChange={(e) => setEditEmail(e.target.value)}
                                        placeholder="Enter email address"
                                        disabled={loading}
                                        style={{
                                            width: "100%",
                                            padding: "0.5rem",
                                            fontSize: "1rem",
                                            borderRadius: "5px",
                                            border: "1px solid #ccc"
                                        }}
                                    />
                                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
                                        <button onClick={handleCancelEdit} className="cancel-button" disabled={loading}>Cancel</button>
                                        <button onClick={handleSaveEdit} className="save-button" disabled={loading} style={{ marginLeft: "1rem" }}>{loading ? "Saving..." : "Save"}</button>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
                            )}
                            {success && (
                                <p style={{ color: "green", marginBottom: "1rem" }}>{success}</p>
                            )}

                            {customer.active == 1 ? (
                                <p><strong>Activity Status: </strong> Active  </p>
                            ) : (
                                <p><strong>Activity Status: </strong> Inactive  </p>
                            )}

                            <button onClick={handleEdit} className="edit-button">Edit</button>
                            <button onClick={handleDelete} className="delete-button" style={{ marginLeft: "1rem", backgroundColor: "#dc3545", color: "white" }}>Delete</button>

                            <hr style={{ margin: "1rem 0", border: "1px solid #ccc" }} />

                            <h4>Rental History</h4>
                            {loadingRentals ? (
                                <p>Loading rental history...</p>
                            ) : rentals.length > 0 ? (
                                <div style={{ maxHeight: "300px", overflowY: "auto", marginTop: "0.5rem" }}>
                                    <table style={{ width: "100%", fontSize: "0.9rem", borderCollapse: "collapse" }}>
                                        <thead>
                                            <tr style={{ borderBottom: "2px solid #ccc" }}>
                                                <th style={{ textAlign: "left", padding: "0.5rem" }}>Film</th>
                                                <th style={{ textAlign: "left", padding: "0.5rem" }}>Rental Date</th>
                                                <th style={{ textAlign: "left", padding: "0.5rem" }}>Return Date</th>
                                                <th style={{ textAlign: "left", padding: "0.5rem" }}>Status</th>
                                                <th style={{ textAlign: "center", padding: "0.5rem" }}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rentals.map((rental) => (
                                                <tr key={rental.rental_id} style={{ borderBottom: "1px solid #eee" }}>
                                                    <td style={{ padding: "0.5rem" }}>{rental.title}</td>
                                                    <td style={{ padding: "0.5rem" }}>{formatDate(rental.rental_date)}</td>
                                                    <td style={{ padding: "0.5rem" }}>{formatDate(rental.return_date)}</td>
                                                    <td style={{ padding: "0.5rem" }}>{rental.status}</td>
                                                    <td style={{ padding: "0.5rem", textAlign: "center" }}>
                                                        {rental.status === "Currently Rented" && (
                                                            <button
                                                                onClick={() => handleReturn(rental)}
                                                                style={{
                                                                    padding: "0.25rem 0.5rem",
                                                                    fontSize: "0.8rem",
                                                                    backgroundColor: "#28a745",
                                                                    color: "white",
                                                                    border: "none",
                                                                    borderRadius: "3px",
                                                                    cursor: "pointer"
                                                                }}
                                                            >
                                                                Return
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p>No rental history found.</p>
                            )}
                        </div>

                        <button onClick={() => setIsOpen(false)} className="close-button">Close</button>
                        <button onClick={handleRent} className="rent-button">Rent</button>
                    </div>
                </div>
            )}

            {showRentInput && (
                <div className="outer-overlay">
                    <div className="inner-overlay">
                        <h3>Rent to: {customer.first_name} {customer.last_name}</h3>
                        <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                            <label htmlFor="filmId" style={{ display: "block", marginBottom: "0.5rem" }}>
                                <strong>Film ID:</strong>
                            </label>
                            <input
                                id="filmId"
                                type="text"
                                value={filmId}
                                onChange={(e) => setFilmId(e.target.value)}
                                placeholder="Enter film ID"
                                disabled={loading}
                                style={{
                                    width: "100%",
                                    padding: "0.5rem",
                                    fontSize: "1rem",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc"
                                }}
                            />
                        </div>

                        {error && (
                            <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
                        )}
                        {success && (
                            <p style={{ color: "green", marginBottom: "1rem" }}>{success}</p>
                        )}

                        <button
                            onClick={handleCancelRental}
                            className="close-button"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmitRental}
                            className="rent-button"
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "Submit"}
                        </button>
                    </div>
                </div>
            )}

            {showReturnConfirm && rentalToReturn && (
                <div className="outer-overlay">
                    <div className="inner-overlay" style={{ maxWidth: "500px" }}>
                        <h3>Confirm Return</h3>
                        <div style={{ marginTop: "1.5rem", marginBottom: "1.5rem", textAlign: "center" }}>
                            <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
                                Are you sure you want to mark this rental as returned?
                            </p>
                            <div style={{
                                backgroundColor: "#f8f9fa",
                                padding: "1rem",
                                borderRadius: "5px",
                                border: "1px solid #dee2e6"
                            }}>
                                <p style={{ margin: "0.5rem 0" }}>
                                    <strong>Film:</strong> {rentalToReturn.title}
                                </p>
                                <p style={{ margin: "0.5rem 0" }}>
                                    <strong>Rental Date:</strong> {formatDate(rentalToReturn.rental_date)}
                                </p>
                                <p style={{ margin: "0.5rem 0" }}>
                                    <strong>Customer:</strong> {customer.first_name} {customer.last_name}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={cancelReturn}
                            className="close-button"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmReturn}
                            style={{
                                marginTop: "1rem",
                                marginLeft: "1rem",
                                padding: "0.5rem 1rem",
                                borderRadius: "5px",
                                border: "none",
                                cursor: "pointer",
                                backgroundColor: "#28a745",
                                color: "white",
                                transition: "background-color 0.2s ease",
                                fontWeight: "bold"
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = "#218838"}
                            onMouseOut={(e) => e.target.style.backgroundColor = "#28a745"}
                        >
                            Confirm Return
                        </button>
                    </div>
                </div>
            )}

            {showDeleteConfirm && (
                <div className="outer-overlay">
                    <div className="inner-overlay" style={{ maxWidth: "500px" }}>
                        <h3>Confirm Deletion</h3>
                        <p style={{ marginTop: "1.5rem", marginBottom: "1.5rem", fontSize: "1.1rem", textAlign: "center" }}>
                            Are you sure you want to permanently delete this customer? This action cannot be undone.
                        </p>
                        <div style={{
                            backgroundColor: "#f8d7da",
                            color: "#721c24",
                            padding: "1rem",
                            borderRadius: "5px",
                            border: "1px solid #f5c6cb",
                            marginBottom: "1.5rem"
                        }}>
                            <p style={{ margin: "0.5rem 0" }}>
                                Customer: {customer.first_name} {customer.last_name}
                            </p>
                            <p style={{ margin: "0.5rem 0" }}>
                                ID: {customer.customer_id}
                            </p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <button
                                onClick={cancelDelete}
                                className="close-button"
                                disabled={deleting}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                style={{
                                    marginLeft: "1rem",
                                    padding: "0.5rem 1rem",
                                    borderRadius: "5px",
                                    border: "none",
                                    cursor: "pointer",
                                    backgroundColor: "#dc3545",
                                    color: "white",
                                    transition: "background-color 0.2s ease",
                                    fontWeight: "bold"
                                }}
                                disabled={deleting}
                                onMouseOver={(e) => e.target.style.backgroundColor = "#c82333"}
                                onMouseOut={(e) => e.target.style.backgroundColor = "#dc3545"}
                            >
                                {deleting ? "Deleting..." : "Delete Permanently"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}