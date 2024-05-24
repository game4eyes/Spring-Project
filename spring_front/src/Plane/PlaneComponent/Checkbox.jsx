import React from 'react';

const Checkbox = ({ checked, onChange, label }) => (
    <div style={{display : 'flex'}}>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <label style={{marginLeft:'5px', marginTop:'5px'}}>{label}</label>
    </div>
);

export default Checkbox;
