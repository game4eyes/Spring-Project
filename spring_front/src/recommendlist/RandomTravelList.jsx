// src/recommendlist/RandomTravelList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { getRandomTravelItems } from './utils';

const imgStyle = {
  width: '100%',
  height: 'auto',
  marginBottom: '10px'
};

const textStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '30px',
  marginLeft: '10px',
  // marginTop :'50px'
};

const RandomTravelList = ({ list, count, viewType }) => {
  const randomTravelItems = getRandomTravelItems([...list], count);

  return (
    viewType === 1 ? (
      <div className="container px-4 py-5" id="random-travel-cards">
  <h2 className="pb-2 border-bottom">추천 여행지</h2>
  <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
    {randomTravelItems.map(t => (
      <div className="col" key={t.name}>
        <div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" >
          <Link to={`/ticketbook/${t.name}`} style={textStyle}>
            <img src={t.imgSrc} alt={t.name} style={imgStyle} />
            <p style={textStyle}>{t.name}</p>
          </Link>
        </div>
      </div>
    ))}
  </div>
</div>

    ) : (
      <div>
      {randomTravelItems.map((t, index) => (
        <React.Fragment key={t.name}>
          <div className="row featurette">
            <div className={`col-md-7 ${index % 2 === 1 ? 'order-md-2' : ''}`}>
              <h2 className="featurette-heading fw-normal lh-1">
                {t.region} <span className="text-body-secondary">{t.name}</span>
              </h2>
              <p className="lead">{t.description}</p>
            </div>
            <div className={`col-md-5 ${index % 2 === 1 ? 'order-md-1' : ''}`}>
              <img
                className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                width="500px"
                height="500px"
                src={t.imgSrc}
                alt={t.name}
              />
            </div>
          </div>
          {index < count - 1 && <hr className="featurette-divider" />}
        </React.Fragment>
      ))}
    </div>
    
    
    )
  );
};

export default RandomTravelList;
