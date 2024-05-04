import React from 'react';
//import BusSeat from '../../BusSeat';

const BusList = () => {

    const seatselect = () =>{

        window.open('http://localhost:5173/search/busseat', '_blank', 'width=600,height=400');
    }

    return (
        <div>
            <div>
                <h2>터미널 조회 결과</h2>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>{/* 게시물 갯수 or 게시판 번호 */}
                            {/* <th>출발 터미널 코드 (DB,hidden)</th>
                            <th>도착 터미널 코드 (DB,hidden)</th> */}
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            {/* <td>AAAAAA (DB,hidden)</td>
                            <td>BBBBBB (DB,hidden)</td> */}
                            <td>동서울 (DB)</td>
                            <td>홍천 (DB)</td>
                            <td>09:00 (DB)</td>
                            <td>10:00 (DB)</td>
                            <th>30000원 (DB)</th>
                            <td>50(DB)</td>
                            <td>13(DB)</td>
                            <td><button>상세보기</button></td>
                            <td><button onClick={seatselect}>좌석선택</button></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            {/* <th>AAAAAA (DB,hidden)</th>
                            <th>BBBBBB (DB,hidden)</th> */}
                            <td>동서울 (DB)</td>
                            <td>홍천 (DB)</td>
                            <td>09:00 (DB)</td>
                            <td>10:00 (DB)</td>
                            <th>30000원 (DB)</th>
                            <td>34(DB)</td>
                            <td>11(DB)</td>
                            <td><button>상세보기</button></td>
                            <td><button onClick={seatselect}>좌석선택</button></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            {/* <th>AAAAAA (DB,hidden)</th>
                            <th>BBBBBB (DB,hidden)</th> */}
                            <td>동서울 (DB)</td>
                            <td>홍천 (DB)</td>
                            <td>09:00 (DB)</td>
                            <td>10:00 (DB)</td>
                            <th>30000원 (DB)</th>
                            <td>44(DB)</td>
                            <td>1(DB)</td>
                            <td><button >상세보기</button></td>
                            <td><button onClick={seatselect}>좌석선택</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BusList;
