// import React from 'react';
// import '@/bootstrap_css/bootstrap.min.css';
// import '@/bootstrap_js/bootstrap.bundle.min.js';  
// import BusImage from '@components/img/Transportation_img/bus_image.png';
// import TrainImage from '@components/img/Transportation_img/train_image.png';
// import AirportImage from '@components/img/Transportation_img/airport_image.png';
// function CustomCards({ transportation }) {
//   return (
//     <div className="container px-4 py-5" id="custom-cards">
//       <h2 className="pb-2 border-bottom">예매</h2>

//       <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
//         {transportation.map(item => (
//           <div className="col" key={item.id}>
//             <div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style={{backgroundImage: `url(${item.imgSrc})`}}>
//               <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
//                 <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">{item.title}</h3>
//                 <p>{item.explain}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default CustomCards;
