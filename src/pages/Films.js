import React, { useEffect, useState } from "react";
import "./Home.css";
import FilmsSearchResults from "../components/FilmsSearchResults.js"
import TextBox from "../components/SearchTextBox.js";


function Films() {
    const [films, setFilms] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        console.log("useEffect triggered");

        fetch(`http://localhost:3001/api/films/${searchText}`)
            .then((res) => {
                console.log("Fetch response:", res);
                return res.json();
            })
            .then((data) => {
                console.log("Parsed data:", data);
                setFilms(data);
            })
            .catch((err) => console.error("Error fetching:", err));
    }, [searchText]);

    return (
        <div className="">
            <p className="search-bar">
                Search:
                <TextBox
                    value={searchText}
                    onChange={setSearchText}
                    placeholder="Type something..."
                />
            </p >
            <FilmsSearchResults data={films} />
        </div >

    );
}
export default Films;
/*
<p>You selected: {selectedValue}</p>

            */
