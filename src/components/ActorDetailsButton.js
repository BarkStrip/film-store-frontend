import React, { useEffect, useState } from "react";
import "./Components.css"

export default function ActorDetailsButton({ actor }) {
    const [actorDetails, setActorDetails] = useState([]);
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        console.log("useEffect triggered");

        fetch(`http://localhost:3001/api/${actor.actor_id}`)
            .then((res) => {
                console.log("Fetch response:", res);
                return res.json();
            })
            .then((data) => {
                console.log("Parsed data:", data);
                setActorDetails(data);
            })
            .catch((err) => console.error("Error fetching:", err));


    }, []);
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

                        <h2>{actor.first_name} {actor.last_name}</h2>
                        <p><strong>Details: </strong> </p>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0rem", textAlign: "left" }}>
                            <p style={{ margin: 0 }}><strong>Actor ID: </strong>{actor.actor_id} </p>
                            <p style={{ margin: 0 }}><strong>Movies: </strong>{actor.movies} </p>
                            <p style={{ margin: 0 }}><strong>Last Updated: </strong>{actor.last_update} </p>
                        </div>
                        <p><strong>Most Rented Movies: </strong> </p>
                        <div style={{ textAlign: "left" }}>
                            {actorDetails.length > 0 ? (
                                actorDetails.map((actor, index) => (
                                    <div key={actor.actor_id}>
                                        <p1><strong>{index + 1}</strong>: {actor.title}  </p1 >

                                    </div>
                                ))
                            ) : (
                                <p>Loading . . .</p>
                            )}
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="close-button"
                        >
                            Close
                        </button>
                    </div >
                </div >
            )
            }
        </>
    );
}
