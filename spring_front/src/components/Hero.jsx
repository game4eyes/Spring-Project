import React from 'react';
import SeoulImage from '@components/img/region_img/seoul.jpg';
import DaeguImage from '@components/img/region_img/daegu.jpg';
import BusanImage from '@components/img/region_img/busan.jpeg';

const travelListData = [
    { id: 'seoul', imgSrc: SeoulImage, title: '서울', explain: '남산서울타워' },
    { id: 'daegu', imgSrc: DaeguImage, title: '대구', explain: '달성대구현대미술제' },
    { id: 'busan', imgSrc: BusanImage, title: '부산', explain: '부산항대교' }
];

const Hero = () => {
    return (
        <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel" style={{ height: '500px', marginTop: '-35px' }}>
            <div className="carousel-indicators">
                {travelListData.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        data-bs-target="#myCarousel"
                        data-bs-slide-to={index}
                        className={index === 0 ? 'active' : ''}
                        aria-current={index === 0 ? 'true' : ''}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
            </div>
            <div className="carousel-inner">
                {travelListData.map((item, index) => (
                    <div key={item.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        <img src={item.imgSrc} alt={item.title} style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
                        <div className="container">
                            <div className={`carousel-caption ${index === 0 ? 'text-start' : index === 1 ? '' : 'text-end'}`}>
                                <h1>{item.title}</h1>
                                <p style ={{color:'white'}}>{item.explain}</p>
                                <p><a className="btn btn-lg btn-primary" href={`#${item.id}`}>이동하기</a></p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Hero;
