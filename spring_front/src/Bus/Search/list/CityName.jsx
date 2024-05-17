import React from 'react';

const CityName = ({city, onChangeCityCode}) => {
    return (
        <div>
            <p key={city.cityCode} onClick={() => {onChangeCityCode(city.cityCode)}}>{city.cityName}</p>
        </div>
    );
};

export default CityName;
