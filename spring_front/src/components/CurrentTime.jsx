import React, { useState, useEffect } from 'react';

const CurrentTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const dateTime = new Date();
      const formattedDateTime = dateTime.toLocaleString();
      setCurrentDateTime(formattedDateTime);
    }, 1000); // 1초마다 업데이트

    // 컴포넌트가 언마운트될 때 clearInterval을 사용하여 interval을 정리합니다.
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="Today" align="right">
      <h4>현재 시간: {currentDateTime}</h4>
    </div>
  );
}

export default CurrentTime;
