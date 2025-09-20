import React, { useEffect, useState } from "react";
import "./Home.css";
import SearchResults from "../components/SearchResults.js"
import Dropdown from "../components/SearchDropdown.js";
import TextBox from "../components/SearchTextBox.js";


function Films() {
    const [films, setFilms] = useState([]);
    const [selectedValue, setSelectedValue] = useState('Film');
    const [searchText, setSearchText] = useState('');


    const options = [
        { label: 'Film', value: 'Film' },
        { label: 'Actor', value: 'Actor' },
        { label: 'Genre', value: 'Genre' },
    ];

    const handleSelect = (value) => {
        setSelectedValue(value);
        console.log('Selected:', value);
    };

    useEffect(() => {
        console.log("useEffect triggered");

        fetch("http://localhost:3001/api/films")
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
        <div className="">
            <p className="search-bar">
                Search by
                < Dropdown
                    options={options}
                    value={selectedValue}
                    onSelect={handleSelect}
                />:
                <TextBox
                    value={searchText}
                    onChange={setSearchText}
                    placeholder="Type something..."
                />
            </p >
            <SearchResults data={films} />
        </div >

    );
}
export default Films;
/*
<p>You selected: {selectedValue}</p>
<p>You typed: {searchText}</p>
            */
