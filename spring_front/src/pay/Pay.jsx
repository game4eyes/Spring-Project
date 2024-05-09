import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

const Pay = () => {
    const windowClose = () => {
        window.close();
    }
//     const [popupData, setPopupData] = useState(null); // 팝업 창에서 받은 데이터를 저장하는 상태

//       // 팝업 창에서 데이터를 받아오는 함수
//   const receiveDataFromPopup = (data) => {
//     setPopupData(data); // 데이터를 상태에 저장
//   };


    return (
        <div>
            <h1>결제 시스템</h1>
            {/* 여기에 결제 시스템 컴포넌트를 구현할 내용을 추가하세요 */}



            {/*결제조건에 맞을 경우 결제하기 이동 로직 추가*/}
            <Link to="/pay/paysuccess"><button>결제하기</button></Link>
            <button onClick={windowClose}>닫기</button>
        </div>
    );
}

export default Pay;
