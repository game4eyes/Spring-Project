import React from 'react';

const SelectInput = ({ label, value, onChange, options }) => (
    <label>
        {label}
        <select style={{width:'25%',marginLeft:'10px'}}value={value} onChange={onChange}>
            <option value="">{`Select ${label.toLowerCase()}`}</option>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </label>
);

export default SelectInput;