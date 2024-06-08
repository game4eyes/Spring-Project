// 서버 호스트 설정
import axios from "axios";

// export const API_SERVER_HOST = 'http://localhost:9090'; // 서버 주소
export const API_SERVER_HOST = 'http://www.trable.kro.kr:9090'; // 서버 주소

// 예약관련 기본 주소
const bookingPrefix = `${API_SERVER_HOST}/insert/db`;

export const bookingInfo = async (BookingInfo) => {
    const res = await axios.post(`${bookingPrefix}`,BookingInfo);
    return res;
}
// 결제 버튼 눌렀을 때 타야함
/**
* @params {
 *   @userEmail 사용자 이메일
 *   @scheduleId 스케쥴 id
 *   @orderId sha256으로 만든 오더 아이디
 *   @orderDate 예약 날짜
 *   @grade 등급
 *   항공 : {
 *      first, economy, business
 *   }
 *   기차 : {
 *      standingFreeSeating, general, special
 *   }
 *   버스 : {
 *       Bus
 *   }
 *   @seatOrderNum 예약한 좌석 수
 *   @return true/false
 *   false 시 이미 데이결제 진행 중인 건이 있음
 *   true 시 성공적으로 데이터 넣음
 *
* */
export const booking = async (OrderDTO) => {
    return await axios.post(`${bookingPrefix}/order/pending`, OrderDTO);
}

// 결제 성공시 주소
/**
 * @params
 *   @userEmail 사용자 이메일
 *   @orderId 성공된 예약 아이디
 * @return true/false
 * */
export const bookingComplete = async (data) => {
    return await axios.post(`${bookingPrefix}/order/payment/complete`, data);
}

// 결제 실패 및 취소시 주소
/**
 * @params
 *   @userEmail 사용자 이메일
 *   @orderId 실패 및 취소 한 예약 아이디
 * @return true/false
 * */
export const bookinFail = async (data) => {
    return await axios.post(`${bookingPrefix}/order/payment/fail`, data);
}