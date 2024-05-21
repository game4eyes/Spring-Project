import React from 'react';

const TimeInput = ({ label, value, onChange }) => {
    return (
        <div>
            <label>
                {label}:
                <input
                    type="time"
                    value={value}
                    onChange={onChange}
                />
            </label>
        </div>
    );
};

export default TimeInput;
