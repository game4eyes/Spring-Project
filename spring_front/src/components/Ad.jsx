import { Link } from "react-router-dom";
import AD1_image from './img/Ad_img/ad1.jpeg';
import AD2_image from './img/Ad_img/ad2.jpeg';
import AD3_image from './img/Ad_img/ad3.jpeg';
//import AD4_image from './Ad_img/ad4.jpeg';
//import AD5_image from './Ad_img/ad5.jpeg';

const Ad = () => {
  const AdList = [
    { id: "ad1", title: "광고1", explain: '광고1', src: AD1_image },
    { id: "ad2", title: "광고2", explain: '광고2', src: AD2_image },
    { id: "ad3", title: "광고3", explain: '광고3', src: AD3_image },
   // { id: "ad4", title: "광고4", explain: '광고4', src: AD4_image },
    //{ id: "ad5", title: "광고5", explain: '광고5', src: AD5_image },
  ];



  return (
    <div className="ad-container">
      <ul className="ad-list">
        {AdList.map(ad => (
          typeof ad !== 'number' && (
            <li key={ad.id} className="ad-item">
              <Link to={'/ad/' + ad.id}>
                <img
                  src={ad.src}
                  alt={ad.title}
                  className="ad-image"
                />
              </Link>
              <div className="ad-description">
                {/* <Link to={'/' + ad.id}>{ad.title}</Link> */}
                {/* <p>{ad.explain}</p> */}
              </div>
            </li>
          )
        ))}
      </ul>
    </div>
  );
}

export default Ad;




