import React, { useEffect, useState } from "react";
import "./Home.css";
import Top5Films from "../components/Top5Films";
import Top5Actors from "../components/Top5Actors";

function Home() {
    const [films, setFilms] = useState([]);
    const [actors, setActors] = useState([]);

    useEffect(() => {
        console.log("useEffect triggered");

        fetch("http://localhost:3001/api/top-films")
            .then((res) => {
                console.log("Fetch response:", res);
                return res.json();
            })
            .then((data) => {
                console.log("Parsed data:", data);
                setFilms(data);
            })
            .catch((err) => console.error("Error fetching:", err));

        fetch("http://localhost:3001/api/top-actors")
            .then((res) => {
                console.log("Fetch response:", res);
                return res.json();
            })
            .then((data) => {
                console.log("Parsed data:", data);
                setActors(data);
            })
            .catch((err) => console.error("Error fetching:", err));


    }, []);
    return (
        <div>
            <p className="top-item-title">Top 5 Films: </p>
            <Top5Films data={films} />

            <p className="top-item-title">Top 5 Actors: </p>
            <Top5Actors data={actors} />
        </div >

    );
}
export default Home;