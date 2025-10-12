import { useState } from "react";
import "./Components.css"

export default function FilmDetailsButton({ film }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showRentInput, setShowRentInput] = useState(false);
    const [customerId, setCustomerId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [currentFilm, setCurrentFilm] = useState(film);

    const handleRentOut = () => {
        setShowRentInput(true);
        setError("");
        setSuccess("");
    };

    const handleSubmitRental = () => {
        if (!customerId.trim()) {
            setError("Please enter a customer ID");
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
                customer_id: customerId,
                film_id: film.film_id,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                if (data.success) {
                    setSuccess("Rental created successfully!");
                    // Update local film state
                    setCurrentFilm({
                        ...currentFilm,
                        available_inventory: Math.max(0, (currentFilm.available_inventory || 0) - 1),
                        rented: (currentFilm.rented || 0) + 1
                    });
                    setTimeout(() => {
                        setCustomerId("");
                        setShowRentInput(false);
                        setIsOpen(false);
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
        setCustomerId("");
        setShowRentInput(false);
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
                        <h3>{currentFilm.title}</h3>
                        <div style={{ textAlign: "left" }}>
                            <p><strong>Description:</strong> {currentFilm.description}</p>
                            {currentFilm.category && <p><strong>Category:</strong> {currentFilm.category}</p>}
                            <p><strong>Rating: </strong>{currentFilm.rating}</p>
                            <p><strong>Release Year: </strong>{currentFilm.release_year}</p>
                            <p><strong>Length: </strong>{currentFilm.length} mins</p>
                            <p><strong>Special Features: </strong>{currentFilm.special_features}</p>
                            <p><strong>Film ID: </strong>{currentFilm.film_id} </p>
                            <p><strong>Available Inventory: </strong>
                                <span style={{
                                    color: currentFilm.available_inventory > 0 ? "green" : "red",
                                    fontWeight: "bold"
                                }}>
                                    {currentFilm.available_inventory || 0} copies available
                                </span>
                            </p>
                            <p><strong>Rented Out: </strong>{currentFilm.rented} </p>
                            <p><strong>Rental Duration: </strong>{currentFilm.rental_duration} days</p>
                            <p><strong>Rental Rate: </strong>${currentFilm.rental_rate} </p>
                            <p><strong>Replacement Cost: </strong>${currentFilm.replacement_cost} </p>
                        </div>



                        <button
                            onClick={() => setIsOpen(false)}
                            className="close-button"
                        >
                            Close
                        </button>
                        <button
                            onClick={handleRentOut}
                            className="rent-button"
                        >
                            Rent Out
                        </button>
                    </div>
                </div>
            )}

            {showRentInput && (
                <div className="outer-overlay">
                    <div className="inner-overlay">
                        <h3>Rent Out: {currentFilm.title}</h3>
                        <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                            <label htmlFor="customerId" style={{ display: "block", marginBottom: "0.5rem" }}>
                                <strong>Customer ID:</strong>
                            </label>
                            <input
                                id="customerId"
                                type="text"
                                value={customerId}
                                onChange={(e) => setCustomerId(e.target.value)}
                                placeholder="Enter customer ID"
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
