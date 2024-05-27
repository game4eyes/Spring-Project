import React from 'react';
import TravelList from './path_to_TravelList';

// 랜덤하게 고유한 name을 가진 3개의 객체를 선택하는 함수
function getRandomTravelItems(list, count) {
  const result = [];
  const usedNames = new Set();

  while (result.length < count && list.length > 0) {
    const randomIndex = Math.floor(Math.random() * list.length);
    const selectedItem = list[randomIndex];

    if (!usedNames.has(selectedItem.name)) {
      result.push(selectedItem);
      usedNames.add(selectedItem.name);
    }

    // 선택된 항목은 리스트에서 제거
    list.splice(randomIndex, 1);
  }

  return result;
}

const randomTravelItems = getRandomTravelItems([...TravelList], 3);

const RandomTravelList = () => {
  return (
    <div className="container px-4 py-5" id="random-travel-cards">
      <h2 className="pb-2 border-bottom">추천 여행지</h2>

      <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
        {randomTravelItems.map(t => (
          <div className="col" key={t.name}>
            <div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg">
              <img src={t.imgSrc} alt={t.name} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
              <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '30px', marginLeft: '10px' }}>{t.name}</h3>
                {/* <p>{t.description}</p> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomTravelList;
