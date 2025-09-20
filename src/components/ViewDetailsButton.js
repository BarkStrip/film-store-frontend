import { useState } from "react";
import "./Components.css"

export default function ViewDetailsButton({ film }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                style={{
                    cursor: "pointer",
                    backgroundColor: "#fbdc61",
                    color: "#003399",
                    border: "none",
                    padding: "0.25rem .5rem",
                    borderRadius: "5px",
                    font: "Impact",
                }}
            >
                View Details
            </button >

            {isOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "white",
                            padding: "2rem",
                            color: "black",
                            borderRadius: "1px",
                            maxWidth: "500px",
                            width: "90%",
                            fontSize: "20px",
                        }}
                    >
                        <h3>{film.title}</h3>
                        <p>Description: {film.description}</p>
                        <p>Rating: {film.rating}</p>
                        <p>Release Year: {film.release_year}</p>
                        <p>Length: {film.length} mins</p>
                        <p>Film ID: {film.film_id} </p>
                        <p>Rented: {film.rented} </p>
                        <p>Replacement Cost: ${film.replacement_cost} </p>
                        <p>Rental Duration: {film.rental_duration} </p>
                        <p>Rental Rate: {film.rental_rate} </p>


                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                marginTop: "1rem",
                                padding: "0.5rem 1rem",
                                borderRadius: "5px",
                                border: "none",
                                cursor: "pointer",
                                backgroundColor: "#dc3545",
                                color: "white",
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )
            }
        </>
    );
}
