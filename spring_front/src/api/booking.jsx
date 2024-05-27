// 서버 호스트 설정
import axios from "axios";



export const API_SERVER_HOST = 'http://ec2-3-37-87-73.ap-northeast-2.compute.amazonaws.com:9090'; // 서버 주소

// 예약 데이터 넘기기
const bookingPrefix = `${API_SERVER_HOST}/booking`;

export const bookingInfo = async (BookingInfo) => {
    const res = await axios.post(`${bookingPrefix}`,BookingInfo);
    return res;
}