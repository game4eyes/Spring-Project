import React from 'react';

const DateInput = ({ label, onChange }) => (
    <label>
        {label}:
        <input type="date" onChange={onChange} />
    </label>
);

export default DateInput;
