import { useEffect } from 'react';
import './Location.css';
import { useNavigate } from 'react-router-dom';

const Location = () => {

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Adding full-height class");
    document.documentElement.classList.add('full-height');
    document.body.classList.add('full-height');
  
    return () => {
      console.log("Removing full-height class");
      document.documentElement.classList.remove('full-height');
      document.body.classList.remove('full-height');
    };
  }, []);


  return (
    <div className="hell-location-container">
            <h1 className='hell-title'>Welcome to Hell</h1>
            <div className="hell-button-container">
                <button onClick={() => alert('어디가...?')}>홈화면</button>
                <button className="real-button" onClick={() => navigate('/')}>TRABLE</button>
            </div>
    </div>
  );
}

export default Location;
