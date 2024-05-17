import React, { useEffect,useState } from 'react';
import { getTrainInfo } from '@/api/dataApi';
import { useNavigate } from 'react-router-dom';
//import BusSeat from '../../BusSeat';



import axios from 'axios';

const TrainList = ({ startStationID, endStationID, hour, dayz }) => {
    const [trainInfo, setTrainInfo] = useState([]);

  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getTrainInfo(startStationID, endStationID, hour, dayz);
                setTrainInfo(res.station); // API 응답에서 기차 정보를 가져옵니다.
            } catch (error) {
                console.error('Error fetching train info:', error);
            }
        };
    
        fetchData();
    }, [startStationID, endStationID, hour, dayz]);
    


                    const [popupData, setPopupData] = useState(null); // 팝업 창에서 받은 데이터를 저장하는 상태
              
                // 팝업 창에서 데이터를 받아오는 함수
                const receiveDataFromPopup = (data) => {
                  setPopupData(data); // 데이터를 상태에 저장
                };




        const seatselect = () =>{

        window.open('http://localhost:5173/search/busseat', '_blank', 'width=600,height=400');
    }

    const payment = () =>{

        window.open('http://localhost:5173/pay/pay', '_blank', 'width=600,height=400');
    }

    return (
        <div>
        {trainInfo.length > 0 ? (
            <table>
                <thead>
                    <tr>
                        <th>열차 이름</th>
                        <th>열차 종류</th>
                        <th>열차 번호</th>
                        <th>출발 시간</th>
                        <th>도착 시간</th>
                        <th>소요 시간</th>
                        <th>운행 요일</th>
                        <th>요금</th>
                        <th>좌석 선택</th>
                        <th>예매</th>
                    </tr>
                </thead>
                <tbody>
                    {trainInfo.map((train, index) => (
                        <tr key={index}>
                            <td>{train.railName}</td>
                            <td>{train.trainClass}</td>
                            <td>{train.trainNo}</td>
                            <td>{train.departureTime}</td>
                            <td>{train.arrivalTime}</td>
                            <td>{train.wasteTime}</td>
                            <td>{train.runDay}</td>
                            <td>
                                {train.fare.generalFare.weekday && <p>평일: {train.fare.generalFare.weekday}</p>}
                                {train.fare.generalFare.weekend && <p>주말: {train.fare.generalFare.weekend}</p>}
                                {train.fare.generalFare.holiday && <p>공휴일: {train.fare.generalFare.holiday}</p>}
                            </td>
                            <td><button onClick={seatselect}>좌석 선택</button></td>
                            <td>
                                <button onClick={payment}>결제</button>
                                {popupData && <ResultPage result={popupData} />}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <p>데이터를 불러오는 중입니다...</p>
        )}
    </div>
    
    
    
    
    );
};

export default TrainList;


















// const TrainList = () => {




//             //결제 창
        
      

         
//                 const fetchStationInfo = async (stationStationID,endStationID,hour,dayz) => {
//                     try {
//                         const data = await getStationInfo(stationStationID,endStationID,hour,dayz);
//                         setStations(data);
//                     } catch (error) {
//                         console.error('Error fetching station data:', error);
//                     }
//                 };
            
//                 const urlParams = new URLSearchParams(window.location.search); 
            

//     const seatselect = () =>{

//         window.open('http://localhost:5173/search/busseat', '_blank', 'width=600,height=400');
//     }

//     const payment = () =>{

//         window.open('http://localhost:5173/pay/pay', '_blank', 'width=600,height=400');
//     }

//     return (
//         <div>


//             <div>
//                 <h1>검색 조회 결과</h1>



//                 </div>

















//             <div>
//                 <h2>기차 조회 결과</h2>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>No</th>{/* 게시물 갯수 or 게시판 번호 */}
//                             {/* <th>출발 터미널 코드 (DB,hidden)</th>
//                             <th>도착 터미널 코드 (DB,hidden)</th> */}
//                             <th>구분</th>
//                             <th>열차번호</th>
//                             <th>출발역</th>
//                             <th>도착역</th>
//                             <th>특실/우등실</th>
//                             <th>일반실</th>
//                             <th>유아</th>
//                             <th>자유석/입석</th>
//                             <th>인터넷특가(멤버쉽 혜택)</th>
//                             <th>예매대기</th>
//                             <th>정차역(경유)</th>
//                             <th>차량유형/편성정보</th>
//                             <th>운임요금</th>
//                             <th>소요시간</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td>1</td>
//                             {/* <td>AAAAAA (DB,hidden)</td>
//                             <td>BBBBBB (DB,hidden)</td> */}
//                               <th>기차명(DB)</th>
//                             <th>기차(DB)</th>
//                             <td>출발역 (DB)</td>
//                             <td>도착역 (DB)</td>  
//                             <td>09:00 (DB)</td>
//                             <td>10:00 (DB)</td>
//                             <th>30000원 (DB)</th>
//                             <td>50(DB)</td>
//                             <td>13(DB)</td>
//                             <td><button>상세보기</button></td>
//                             <td><button onClick={seatselect}>좌석선택</button></td>
//                             <button type="submit"  onClick={payment} >결제</button>
//                         </tr>
//                         <tr>
                        
//                             <td>2</td>
//                             {/* <th>AAAAAA (DB,hidden)</th>
//                             <th>BBBBBB (DB,hidden)</th> */}
//                               <td>버스명(DB)</td>
//                             <td>시외(DB)</td>
//                             <td>출발터미널 (DB)</td>
//                             <td>도착터미널 (DB)</td>
//                             <td>09:00 (DB)</td>
//                             <td>10:00 (DB)</td>
//                             <th>30000원 (DB)</th>
//                             <td>34(DB)</td>
//                             <td>11(DB)</td>
//                             <td><button>상세보기</button></td>
//                             <td><button onClick={seatselect}>좌석선택</button></td>
//                             <button type="submit"  onClick={payment} >결제</button>
                            
//                         </tr>
//                         <tr>
                          
//                             <td>3</td>
//                             {/* <th>AAAAAA (DB,hidden)</th>
//                             <th>BBBBBB (DB,hidden)</th> */}
//                             <td>버스명(DB)</td>
//                             <td>시외(DB)</td>
//                             <td>출발터미널 (DB)</td>
//                             <td>도착터미널 (DB)</td>
//                             <td>09:00 (DB)</td>
//                             <td>10:00 (DB)</td>
//                             <th>30000원 (DB)</th>
//                             <td>44(DB)</td>
//                             <td>1(DB)</td>
//                             <td><button >상세보기</button></td>
//                             <td><button onClick={seatselect}>좌석선택</button></td>
//                             <button type="submit"  onClick={payment} >결제</button> {popupData && <ResultPage result={popupData} />} {/* 팝업 창에서 받은 데이터를 결과 페이지에 전달 */}
                           
                          
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default TrainList;
