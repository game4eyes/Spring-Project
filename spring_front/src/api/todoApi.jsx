import axios from "axios";

// 서버 호스트 설정
export const API_SERVER_HOST = 'http://localhost:9090'; // 서버 주소

// 사용자 관련 엔드포인트
const userPrefix = `${API_SERVER_HOST}/api/user`;

const axoisConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
}

// // 비동기 통신 예제
// // 특정 엔드포인트에 대한 GET 요청 예제
// export const getOne = async (id) => {
//     const res = await axios.get(`${userPrefix}/${id}`); // 엔드포인트 조정
//     return res.data;
// };

// // 리스트 조회 예제 (페이지네이션)
// export const getList = async (pageParam) => {
//     const { page, size } = pageParam;

//     // params를 사용하여 쿼리 파라미터 전달
//     const res = await axios.get(`${userPrefix}/list`, { params: { page, size } });
//     return res.data;
// };

// 회원가입 요청
export const userJoin = async (userData) => {
    const res = await axios.post(`${userPrefix}/join`, userData, axoisConfig); // 회원가입 엔드포인트
    return res.data;
};

// 로그인 요청
export const userLogin = async (loginData) => {
    const res = await axios.post(`${userPrefix}/login`, loginData); // 로그인 엔드포인트
    return res.data;
};

// 로그아웃 요청
export const userLogout = async () => {
    const res = await axios.get(`${userPrefix}/logout`); // 로그아웃 엔드포인트
    return res.data;
};

// 세션 정보 조회
export const getSessionList = async () => {
    const res = await axios.get(`${userPrefix}/session-list`); // 세션 리스트 엔드포인트
    return res.data;
};
