import React from 'react';
import "./Components.css";

const TextBox = ({ value, onChange, placeholder }) => {
    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className="textbox"
        />
    );
};

export default TextBox;