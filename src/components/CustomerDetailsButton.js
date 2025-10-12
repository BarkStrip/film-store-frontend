import { useState, useEffect } from "react";
import "./Components.css"

export default function CustomerDetailsButton({ customer }) {
    const [isOpen, setIsOpen] = useState(false);
    const [rentals, setRentals] = useState([]);
    const [loadingRentals, setLoadingRentals] = useState(false);

    useEffect(() => {
        if (isOpen) {
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
        }
    }, [isOpen, customer.customer_id]);

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString();
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
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rentals.map((rental) => (
                                                <tr key={rental.rental_id} style={{ borderBottom: "1px solid #eee" }}>
                                                    <td style={{ padding: "0.5rem" }}>{rental.title}</td>
                                                    <td style={{ padding: "0.5rem" }}>{formatDate(rental.rental_date)}</td>
                                                    <td style={{ padding: "0.5rem" }}>{formatDate(rental.return_date)}</td>
                                                    <td style={{ padding: "0.5rem" }}>{rental.status}</td>
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
                            onClick={() => setIsOpen(false)}
                            className="rent-button"
                        >
                            Rent
                        </button>
                    </div>
                </div>
            )
            }
        </>
    );
}
