import React, { useEffect, useState } from "react";
import "./Home.css";
import Top5Items from "../components/Top5Items";

function Home() {
    const [films, setFilms] = useState([]);

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
    }, []);
    return (
        <div>
            <p className="top-item-title">Top 5 Films: </p>
            <Top5Items data={films} />

            <p className="top-item-title">Top 5 Films: </p>
            <Top5Items data={films} />
        </div >

    );
}
export default Home;