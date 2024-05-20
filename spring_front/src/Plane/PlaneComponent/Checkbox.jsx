import React from 'react';

const Checkbox = ({ checked, onChange, label }) => (
    <div>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <label>{label}</label>
    </div>
);

export default Checkbox;
