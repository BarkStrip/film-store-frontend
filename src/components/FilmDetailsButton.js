import { useState } from "react";
import "./Components.css"

export default function FilmDetailsButton({ film }) {
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
                <div className="description-text-overlay">
                    <div className="description-background-overlay">
                        <h3>{film.title}</h3>
                        <div style={{ textAlign: "left" }}>
                            <p><strong>Description:</strong> {film.description}</p>
                            <p><strong>Rating: </strong>{film.rating}</p>
                            <p><strong>Release Year: </strong>{film.release_year}</p>
                            <p><strong>Length: </strong>{film.length} mins</p>
                            <p><strong>Special Features: </strong>{film.special_features} mins</p>
                            <p><strong>Film ID: </strong>{film.film_id} </p>
                            <p><strong>Rented: </strong>{film.rented} </p>
                            <p><strong>Rental Duration: </strong>{film.rental_duration} </p>
                            <p><strong>Rental Rate: </strong>{film.rental_rate} </p>
                            <p><strong>Replacement Cost: </strong>${film.replacement_cost} </p>
                        </div>



                        <button
                            onClick={() => setIsOpen(false)}
                            className="close-button"
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
