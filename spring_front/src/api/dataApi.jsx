// 서버 호스트 설정
import axios from "axios";

export const API_SERVER_HOST = 'http://ec2-3-37-88-212.ap-northeast-2.compute.amazonaws.com:9090'; // 서버 주소

// 기본 주소 설정
const apiPrefix = `${API_SERVER_HOST}/api`
// 도시
const cityPrefix =`${apiPrefix}/city`;
// 터미널
const stationPrefix = `${apiPrefix}/station`
// 버스
const busPrefix = `${apiPrefix}/bus`;
// 기차
const trainPrefix = `${apiPrefix}/train`

// 각 도 별 도시 정보 출력
export const getCityInfo = async (cityRegion) => {
    const res = await  axios.get(`${cityPrefix}`,cityRegion);
    // cityRegion = 서울, 경기도 와 같은 대단위 도시 명만 전송
    // http://ec2-3-37-88-212.ap-northeast-2.compute.amazonaws.com:9090/api/city?cityRegion=${cityRegion}
    return res.data;
}
// 도시 코드를 넘겨 주면 그 도시에 있는 터미널의 정보를 줌
export const getNearByCity = async (cityCode) => {
    const res = await axios.get(`${busPrefix}/${cityCode}`);
    // cityCode = 1000 (서울)
    // http://ec2-3-37-88-212.ap-northeast-2.compute.amazonaws.com:9090/api/bus/near/1000
    // 결과
    // "expressTerminalDTO": [
    //     {
    //         "stationID": 4000022,
    //         "stationName": "서울남부터미널",
    //         "x": 127.01558016092977,
    //         "y": 37.484532214219804,
    //         "stationDTO": null,
    //         "stationClass": 0
    //     },
    //     {
    //         "stationID": 4000035,
    //         "stationName": "동서울종합터미널",
    //         "x": 127.0940617079701,
    //         "y": 37.534392979724295,
    //         "stationDTO": null,
    //         "stationClass": 0
    //     },
    return res.data;
}
// terminalName 가 포함된
export const getExpress = async (terminalName) => {
    const res = await (`${busPrefix}/express`, terminalName);
    return res.data;
}

// 위 같은 파람을 받아옴
export const getIntercity = async (terminalName) => {
    const res = await (`${busPrefix}/intercity`, terminalName);
    return res.data;
}
// 출발지 id, 도착지 id 값을 가지고 값 가져옴
export const getOperationInfo = async (startStationID, endStationID) => {
    const res = await (`${busPrefix}/operation/info`,startStationID, endStationID);
    return res.data;
}

export const getStationInfo = async (stationClass) => {
    const res = await (`${stationPrefix}/${stationClass}`);
    // 3 : 기차역(고속 철도)
    // 4 : 고속버스터미널
    // 5 : 공항
    // 6 : 시외버스터미널
    return res.data;
}

export const getTrainInfo = async (startStationID,endStationID,hour,dayz) => {
    const res = await (`${trainPrefix}/${startStationID}/${endStationID}`,hour,dayz);
    // hour은 24시 를 기준으로 받아옴 1자리 수는 앞에 0을 붙여준다
    // dayz는 월,화,수,목,금,토,일 만 넘길 수 있도록 하면된다.
    return res.data;
}