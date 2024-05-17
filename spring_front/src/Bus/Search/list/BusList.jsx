import React, { useState } from 'react';
//import BusSeat from '../../BusSeat';

const BusList = () => {
            //결제 창
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

            <div>
                <h1>테스트페이지</h1>
                </div>
            <div>
                <h2>터미널 조회 결과</h2>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>{/* 게시물 갯수 or 게시판 번호 */}
                            {/* <th>출발 터미널 코드 (DB,hidden)</th>
                            <th>도착 터미널 코드 (DB,hidden)</th> */}
                            <th>버스명</th>
                            <th>등급</th>
                            <th>출발 터미널</th>
                            <th>도착 터미널</th>
                            <th>버스 유형</th>
                            <th>출발 시간</th>
                            <th>도착 시간</th>
                            <th>가격</th>
                            <th>총 좌석</th>
                            <th>예매가능</th>
                            <th>정보</th>
                            <th>좌석선택</th>
                            <th>결제하기</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            {/* <td>AAAAAA (DB,hidden)</td>
                            <td>BBBBBB (DB,hidden)</td> */}
                              <th>버스명(DB)</th>
                            <th>시외(DB)</th>
                            <td>출발터미널 (DB)</td>
                            <td>도착터미널 (DB)</td>  
                            <td>09:00 (DB)</td>
                            <td>10:00 (DB)</td>
                            <th>30000원 (DB)</th>
                            <td>50(DB)</td>
                            <td>13(DB)</td>
                            <td><button>상세보기</button></td>
                            <td><button onClick={seatselect}>좌석선택</button></td>
                            <button type="submit"  onClick={payment} >결제</button>
                        </tr>
                        <tr>
                            <td>2</td>
                            {/* <th>AAAAAA (DB,hidden)</th>
                            <th>BBBBBB (DB,hidden)</th> */}
                              <td>버스명(DB)</td>
                            <td>시외(DB)</td>
                            <td>출발터미널 (DB)</td>
                            <td>도착터미널 (DB)</td>
                            <td>09:00 (DB)</td>
                            <td>10:00 (DB)</td>
                            <th>30000원 (DB)</th>
                            <td>34(DB)</td>
                            <td>11(DB)</td>
                            <td><button>상세보기</button></td>
                            <td><button onClick={seatselect}>좌석선택</button></td>
                            <button type="submit"  onClick={payment} >결제</button>
                            
                        </tr>
                        <tr>
                          
                            <td>3</td>
                            {/* <th>AAAAAA (DB,hidden)</th>
                            <th>BBBBBB (DB,hidden)</th> */}
                            <td>버스명(DB)</td>
                            <td>시외(DB)</td>
                            <td>출발터미널 (DB)</td>
                            <td>도착터미널 (DB)</td>
                            <td>09:00 (DB)</td>
                            <td>10:00 (DB)</td>
                            <th>30000원 (DB)</th>
                            <td>44(DB)</td>
                            <td>1(DB)</td>
                            <td><button >상세보기</button></td>
                            <td><button onClick={seatselect}>좌석선택</button></td>
                            <button type="submit"  onClick={payment} >결제</button> {popupData && <ResultPage result={popupData} />} {/* 팝업 창에서 받은 데이터를 결과 페이지에 전달 */}
                           
                          
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BusList;
