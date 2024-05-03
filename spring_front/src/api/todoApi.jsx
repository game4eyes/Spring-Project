import axios from "axios";

// 경로를 작성
export const API_SERVER_HOST = 'http://localhost:9090';
const prefix = `${API_SERVER_HOST}/user/`;
const userJoiin = `${API_SERVER_HOST}/session-login/`;

// 비동기 통신
// /api/todo/{tno}
export const getOne = async(tno) =>{
    const res = await axios.get(`${prefix}/${tno}`);
    return res.data;
}

// /api/todo/list?page=3&size=10
// param 값을 객체 스타일로 받는다.
export const getList = async(pageParam) =>{
    const {page, size} = pageParam;

    // params로 넘기면 ? key=value&key=value 형식으로 작성이 된다.
    const res 
    = await axios.get(`${prefix}/list`,{params:{page, size}});
    // = await axios.get(`${prefix}/list`,{params:{...pageParam}});
    return res.data;
}


