import React, { useState } from 'react';
import './AutoFilterDropdown.css';

const AutoFilterDropdown = ({ data, property, valueChange }) => {
    const [filterText, setFilterText] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
        setDropdownOpen(() => true)
    };

    const filterData = () => {
        return data.filter(item =>
            item[property].toLowerCase().includes(filterText.toLowerCase())
        );
    };

    const handleItemClick = (item) => {
        valueChange(item);
        setFilterText(item[property]);
        setDropdownOpen((() => false))
    };

    const highlightMatch = (text) => {
        if (!text) return null;

        const index = text.toLowerCase().indexOf(filterText.toLowerCase());
        if (index === -1) return text;

        const before = text.slice(0, index);
        const match = text.slice(index, index + filterText.length);
        const after = text.slice(index + filterText.length);

        return (
            <>
                {before}
                <strong>{match}</strong>
                {after}
            </>
        );
    };

    return (
        <div className="dropdown-container">
            <div className="dropdown-input">
                <input
                    type="text"
                    value={filterText}
                    onChange={handleFilterChange}
                    placeholder="Filter..."
                />
            </div>
            {dropdownOpen && (
                <ul className="dropdown-menu">
                    {filterData().map(item => (
                        <li key={item.id} onClick={() => handleItemClick(item)}>
                            {highlightMatch(item[property])}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutoFilterDropdown;
