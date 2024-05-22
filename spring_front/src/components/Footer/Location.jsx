import React from 'react';
import './Location.css';  // 스타일을 위한 CSS 파일
import Layout from '../Layout';

const Location = () => {
  return (
    <div className="location-container">
        <Layout>
            <h1>지옥</h1>
            <p>우리의 주소를 찾으러 여기까지 왔다면 너는 너무 멀리 들어와버렸어. 지옥에 온걸 환영한다!</p>
            <p>주소: 지옥의 끝자락</p>
            <div className="button-container">
                <button onClick={() => alert('영원히 함께하자')}>여기서 꺼내줘!</button>
            </div>
        </Layout>
    </div>
  );
}

export default Location;
