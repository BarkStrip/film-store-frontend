import { useState } from "react";
import "./Components.css";

export default function AddCustomerButton({ onCustomerAdded }) {
    const [isOpen, setIsOpen] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = () => {
        if (!firstName.trim() || !lastName.trim() || !email.trim()) {
            setError("All fields are required");
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        fetch("http://localhost:3001/api/customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                if (data.success) {
                    setSuccess("Customer added successfully!");
                    setTimeout(() => {
                        setFirstName("");
                        setLastName("");
                        setEmail("");
                        setIsOpen(false);
                        setSuccess("");
                        if (onCustomerAdded) {
                            onCustomerAdded();
                        }
                    }, 1500);
                } else {
                    setError(data.error || "Failed to add customer");
                }
            })
            .catch((err) => {
                setLoading(false);
                setError("Error adding customer: " + err.message);
            });
    };

    const handleCancel = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setError("");
        setSuccess("");
        setIsOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                style={{
                    padding: "0.5rem 1rem",
                    fontSize: "1rem",
                    backgroundColor: "#ffdb4c",
                    color: "#856b02",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontFamily: "Impact, sans-serif",
                    marginLeft: "2rem",
                }}
            >
                Add New Customer
            </button>

            {isOpen && (
                <div className="outer-overlay">
                    <div className="inner-overlay">
                        <h3>Add New Customer</h3>
                        <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                            <label htmlFor="firstName" style={{ display: "block", marginBottom: "0.5rem" }}>
                                <strong>First Name:</strong>
                            </label>
                            <input
                                id="firstName"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
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

                            <label htmlFor="lastName" style={{ display: "block", marginBottom: "0.5rem" }}>
                                <strong>Last Name:</strong>
                            </label>
                            <input
                                id="lastName"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
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

                            <label htmlFor="email" style={{ display: "block", marginBottom: "0.5rem" }}>
                                <strong>Email:</strong>
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                        </div>

                        {error && (
                            <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
                        )}
                        {success && (
                            <p style={{ color: "green", marginBottom: "1rem" }}>{success}</p>
                        )}

                        <button
                            onClick={handleCancel}
                            className="close-button"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="rent-button"
                            disabled={loading}
                        >
                            {loading ? "Adding..." : "Add Customer"}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
