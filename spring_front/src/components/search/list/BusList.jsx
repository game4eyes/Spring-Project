import React from 'react';
import { Link } from 'react-router-dom';

const BusList = () => {
    return (
        <div>
            <h2>한국 터미널 리스트</h2>
            <ul>
                <li>
                    <Link to="/terminals/seoul">서울</Link>
                    <ul>
                        <li>
                            <Link to="/terminals/seoul/express">서울 익스프레스 터미널</Link>
                        </li>
                        <li>
                            <Link to="/terminals/seoul/bus">서울 버스 터미널</Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link to="/terminals/incheon">인천</Link>
                    <ul>
                        <li>
                            <Link to="/terminals/incheon/international">인천 국제공항 터미널</Link>
                        </li>
                        <li>
                            <Link to="/terminals/incheon/ferry">인천 페리 터미널</Link>
                        </li>
                    </ul>
                </li>
                {/* 다른 지역의 터미널을 추가할 수 있습니다. */}
            </ul>
        </div>
    );
};

export default BusList;
