import React from 'react';
import "./Components.css"

const Dropdown = ({ options, value, onSelect }) => {
    const handleChange = (event) => {
        onSelect(event.target.value);
    };

    return (
        <select
            value={value}
            onChange={handleChange}
            className="dropdown"
        >
            {options.map((option) => (
                <option
                    key={option.value}
                    value={option.value}
                    className="text-xl font-bold text-white-400 dark:text-gray-400"
                >
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;
