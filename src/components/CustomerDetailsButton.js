import { useState } from "react";
import "./Components.css"

export default function CustomerDetailsButton({ customer }) {
    const [isOpen, setIsOpen] = useState(false);

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
                            Rent Out
                        </button>
                    </div>
                </div>
            )
            }
        </>
    );
}
