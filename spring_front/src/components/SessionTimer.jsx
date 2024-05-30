import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../global/AuthContext';
import { ReactComponent as TimerIcon } from '@/icon/timer_blue.svg';
import '@/css/timer.css';

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

  const isTimeLow = sessionTimeRemaining <= 5 * 60 * 1000; // 5 minutes in milliseconds

  return (
    <div 
      className="timer-container"
      style={{ color: isTimeLow ? 'red' : 'black' }}
    >
      <TimerIcon className={`timer-icon ${isTimeLow ? 'low-time' : ''}`} /> 
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};

export default SessionTimer;
