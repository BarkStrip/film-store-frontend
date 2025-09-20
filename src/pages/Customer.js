import React, { useEffect, useState } from "react";
import "./Home.css";
import CustomersSearchResults from "../components/CustomersSearchResults.js"
import TextBox from "../components/SearchTextBox.js";


function Customer() {
    const [customers, setCustomers] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        console.log("useEffect triggered");

        fetch(`http://localhost:3001/api/customers/${searchText}`)
            .then((res) => {
                console.log("Fetch response:", res);
                return res.json();
            })
            .then((data) => {
                console.log("Parsed data:", data);
                setCustomers(data);
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
            <CustomersSearchResults data={customers} />
        </div >

    );
}
export default Customer;
