import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const ResultPage = ({ onClose, result }) => { // props에서 onClose와 result를 구조분해

//결과창 페이지


    const navigate = useNavigate();

    const handleWindowClose = useCallback(() => {
       // onClose(); // 부모 창의 onClose 함수 호출
        window.opener.location.href = '/'; // 부모 창의 위치 변경 (입력 정보 가져오고 저장하는 부분 개발 필요)
        window.close(); 
    }, [onClose]);

    return (
        <div>
            <h1>{result}</h1> {/* 결과창에 props로 받은 결과를 출력 */}
            <button onClick={handleWindowClose}>창 닫기</button>
        </div>
    );
};

export default ResultPage;
