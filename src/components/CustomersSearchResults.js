import React, { useState, useEffect } from "react";
import CustomerDetailsButton from "./CustomerDetailsButton";

export default function CustomersSearchResults({ data }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 100;

    const totalPages = Math.floor((data.length + itemsPerPage - 1) / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = data.slice(startIndex, startIndex + itemsPerPage);

    // Reset to page 1 when data changes
    useEffect(() => {
        setCurrentPage(1);
    }, [data]);

    return (
        <div className="search-results">
            <div style={{ textAlign: "left", paddingLeft: '20px' }}>
                {data.length ? (
                    <p>  Diplaying {startIndex + 1} - {startIndex + currentData.length} of {data.length} results </p>
                ) : (
                    <p> No results </p>
                )}

            </div>
            <table className="results-table">
                <thead>
                    <tr>

                        <th>First</th>
                        <th>Last</th>
                        <th>Email</th>
                        <th>ID</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((customer) => (
                        <tr key={customer.customer_id}>
                            <td>{customer.first_name}</td>
                            <td>{customer.last_name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.customer_id}</td>
                            <td><CustomerDetailsButton customer={customer} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {
                totalPages > 1 && (
                    <div className="pagination">
                        <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>

                        <span>Page {Math.floor(currentPage)} of {totalPages}</span>

                        <button
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                )
            }
        </div >
    );
}