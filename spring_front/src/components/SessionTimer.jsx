import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../User/AuthContext';

const SessionTimer = ({ sessionTimeout, handleLogout }) => {
  const { lastActiveTime } = useContext(AuthContext);
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState(sessionTimeout);
  const navigate = useNavigate();

  useEffect(() => {
    const calculateRemainingTime = () => {
      const elapsedTime = Date.now() - lastActiveTime;
      return sessionTimeout - elapsedTime;
    };

    setSessionTimeRemaining(calculateRemainingTime());

    const sessionInterval = setInterval(() => {
      const remainingTime = calculateRemainingTime();

      if (remainingTime <= 0) {
        clearInterval(sessionInterval);
        handleSessionTimeout();
      } else {
        setSessionTimeRemaining(remainingTime);
      }
    }, 1000);

    return () => clearInterval(sessionInterval);
  }, [lastActiveTime, sessionTimeout]);

  const minutes = Math.floor(sessionTimeRemaining / (1000 * 60));
  const seconds = Math.floor((sessionTimeRemaining / 1000) % 60);

  const handleSessionTimeout = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <div style={{ marginRight: '10px', marginBottom: '15px', textAlign: 'right' }}>
      세션 만료까지 남은 시간: {minutes}: {seconds}
    </div>
  );
};

export default SessionTimer;
