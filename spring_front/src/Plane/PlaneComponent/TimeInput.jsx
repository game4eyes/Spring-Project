import React from 'react';

const TimeInput = ({ label, value, onChange }) => {
    return (
        <div>
            <label>
                {label}
                <input
                 style={{marginLeft:'10px'}}
                    type="time"
                    value={value}
                    onChange={onChange}
                />
            </label>
        </div>
    );
};

export default TimeInput;
