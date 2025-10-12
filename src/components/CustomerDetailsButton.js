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

    const handleReturn = (rentalId) => {
        if (!window.confirm("Are you sure you want to mark this rental as returned?")) {
            return;
        }

        fetch(`http://localhost:3001/api/rentals/${rentalId}/return`, {
            method: "PUT",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    fetchRentals(); // Refresh rental history
                } else {
                    alert(data.error || "Failed to return rental");
                }
            })
            .catch((err) => {
                alert("Error returning rental: " + err.message);
            });
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
                            <p><strong>Name: </strong>{customer.first_name} {customer.last_name}</p>
                            <p><strong>Email: </strong>{customer.email} </p>

                            {customer.active == 1 ? (
                                <p><strong>Activity Status: </strong> Active  </p>
                            ) : (
                                <p><strong>Activity Status: </strong> Inactive  </p>
                            )}

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
                                                                onClick={() => handleReturn(rental.rental_id)}
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

                        <button
                            onClick={() => setIsOpen(false)}
                            className="close-button"
                        >
                            Close
                        </button>
                        <button
                            onClick={handleRent}
                            className="rent-button"
                        >
                            Rent
                        </button>
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
        </>
    );
}
