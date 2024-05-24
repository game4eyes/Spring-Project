import React from 'react';

const DateInput = ({ label, onChange }) => {
    // 오늘 날짜를 YYYY-MM-DD 형식으로 생성
    const today = new Date().toISOString().split('T')[0];

    return (
        <label>
            {label}
            <input style={{width:'25%',marginLeft:'10px'}} type="date" onChange={onChange} defaultValue={today} min={today} />
        </label>
    );
};

export default DateInput;
