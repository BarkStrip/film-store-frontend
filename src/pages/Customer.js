import React, { useEffect, useState, useCallback } from "react";
import "./Home.css";
import CustomersSearchResults from "../components/CustomersSearchResults.js"
import TextBox from "../components/SearchTextBox.js";
import AddCustomerButton from "../components/AddCustomerButton.js";


function Customer() {
    const [customers, setCustomers] = useState([]);
    const [searchText, setSearchText] = useState('');

    const fetchCustomers = useCallback(() => {
        console.log("Fetching customers");

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

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    return (
        <div className="">
            <p className="search-bar">
                Search:
                <TextBox
                    value={searchText}
                    onChange={setSearchText}
                    placeholder="Type something..."
                />
                <AddCustomerButton onCustomerAdded={fetchCustomers} />
            </p >
            <CustomersSearchResults data={customers} />
        </div >

    );
}
export default Customer;
