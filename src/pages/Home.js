import React, { useEffect, useState } from "react";

function Home() {
    const [backendMessage, setBackendMessage] = useState("");

    useEffect(() => {
        console.log("useEffect triggered");

        fetch("/api/top-films")
            .then((res) => {
                console.log("Fetch response:", res);
                return res.json();
            })
            .then((data) => {
                console.log("Parsed data:", data);
                setBackendMessage(data.message);
            })
            .catch((err) => console.error("Error fetching:", err));
    }, []);
    return (
        <h1> {backendMessage}</h1 >
    );
}
export default Home;