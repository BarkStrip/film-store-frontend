import { useState } from "react";
import "./Components.css"

export default function FilmDetailsButton({ film }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showRentInput, setShowRentInput] = useState(false);
    const [customerId, setCustomerId] = useState("");

    const handleRentOut = () => {
        setShowRentInput(true);
    };

    const handleSubmitRental = () => {
        console.log("Renting film:", film.film_id, "to customer:", customerId);
        // TODO: Add backend API call here
        setCustomerId("");
        setShowRentInput(false);
        setIsOpen(false);
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
                        <h3>{film.title}</h3>
                        <div style={{ textAlign: "left" }}>
                            <p><strong>Description:</strong> {film.description}</p>
                            {film.category && <p><strong>Category:</strong> {film.category}</p>}
                            <p><strong>Rating: </strong>{film.rating}</p>
                            <p><strong>Release Year: </strong>{film.release_year}</p>
                            <p><strong>Length: </strong>{film.length} mins</p>
                            <p><strong>Special Features: </strong>{film.special_features}</p>
                            <p><strong>Film ID: </strong>{film.film_id} </p>
                            <p><strong>Rented: </strong>{film.rented} </p>
                            <p><strong>Rental Duration: </strong>{film.rental_duration} days</p>
                            <p><strong>Rental Rate: </strong>${film.rental_rate} </p>
                            <p><strong>Replacement Cost: </strong>${film.replacement_cost} </p>
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
                        <h3>Rent Out: {film.title}</h3>
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
                                style={{
                                    width: "100%",
                                    padding: "0.5rem",
                                    fontSize: "1rem",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc"
                                }}
                            />
                        </div>

                        <button
                            onClick={handleCancelRental}
                            className="close-button"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmitRental}
                            className="rent-button"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
