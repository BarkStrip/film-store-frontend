import React, { useState, useEffect } from "react";
import FilmDetailsButton from "./FilmDetailsButton";

export default function SearchResults({ data }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 50;

    const totalPages = Math.floor((data.length + itemsPerPage - 1) / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = data.slice(startIndex, startIndex + itemsPerPage);

    // Reset to page 1 when data changes
    useEffect(() => {
        setCurrentPage(1);
    }, [data]);

    if (data.length === 0) {
        return (
            <div className="search-results">
                <div className="loading">Loading . . .</div>
            </div>
        );
    }

    return (
        <div className="search-results">
            <div style={{ textAlign: "left", paddingLeft: '20px' }}>
                Diplaying {startIndex + 1} - {startIndex + currentData.length} of {data.length}
            </div>
            <table className="results-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Rating</th>
                        <th>Category</th>
                        <th>Rent Out</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((film) => (
                        <tr key={film.film_id}>
                            <td>{film.film_id}</td>
                            <td>{film.title}</td>
                            <td>{film.description}</td>
                            <td>{film.rating}</td>
                            <td>{film.category}</td>
                            <td><FilmDetailsButton film={film} /></td>
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