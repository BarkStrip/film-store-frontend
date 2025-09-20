import React, { useEffect, useState } from "react";
import "./Home.css";

function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log("useEffect triggered");

        fetch("http://localhost:3001/api/top-films")
            .then((res) => {
                console.log("Fetch response:", res);
                return res.json();
            })
            .then((data) => {
                console.log("Parsed data:", data);
                setData(data);
            })
            .catch((err) => console.error("Error fetching:", err));
    }, []);
    return (
        <div><p className="top-film-title">
            Top 5 Films:
        </p>
            <div className="film-grid">
                {data.length > 0 ? (
                    data.map((film, index) => (
                        <div key={film.film_id} className="film-card">
                            <h3 className="film-title">{film.title}</h3>
                            <p1 className="ranking">{index + 1}</p1 >

                        </div>
                    ))
                ) : (
                    <p>Loading . . .</p>
                )}
            </div>







            <p className="top-film-title">
                Top 5 Films:
            </p>
            <div className="film-grid2">

                {data.length > 0 ? (
                    data.map((film) => (
                        <div key={film.film_id} className="film-card">
                            <h3>{film.title}</h3>
                            <p>{film.description}</p>
                            <small>
                                {film.release_year} · {film.rating}
                            </small>
                        </div>
                    ))
                ) : (
                    <p>Loading . . .</p>
                )}
            </div>
        </div >

    );
}
export default Home;