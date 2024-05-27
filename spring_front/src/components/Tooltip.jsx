//말풍선 컴포넌트

import React from 'react';
import '@/css/tooltip.css'; // import the tooltip CSS file

const Tooltip = ({ children }) => {
  return (
    <div className="tooltip">
      <button>수수료정보</button>
      <div className="tooltip-content">
        <span className="close">&times;</span>
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
