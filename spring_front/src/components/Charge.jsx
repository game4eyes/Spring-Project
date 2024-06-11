import React from 'react';
import { ChargeContent } from './ChargeContent';
//import '@/css/charge.css';
const Charge = (props) => {
    const charges = ChargeContent();
    const chargeInfo = charges.find(charge => charge.id === props.id);

    return (
        <div className="charge_container">
            <h2>{chargeInfo.title} 티켓 취소 수수료</h2>
            <p style={{ whiteSpace: "pre-wrap" }}>{chargeInfo.body}</p>
        </div>
    );
}

export default Charge;
