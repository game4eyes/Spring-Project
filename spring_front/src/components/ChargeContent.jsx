export const ChargeContent = () => {

    const Content = [
        { id:1, title: "버스", body: `
        1. 무료
        - 차량출발일 2일전
        - 당일 출발 차량 예매 후 1시간 이내
        2. 취소수수료 5%부과 
        - 차량출발일 전일 부터 차량 출발전 1시간 전
        3. 취소수수수료 10%부과
        - 차량 출발전 1시간 이내부터 차량 출발 전
        4. 취소수수료 30%부과
        - 차량 출발 후 6시간 이전까지
        5. 수수료 100%
        - 차량 출발 후 6시간 이후
       `},

       { id:2, title: "기차", body: `
        <월~목요일 승차권>
        1. 무료
        - 1개월 ~ 출발 1일 전
        - 당일 ~ 출발 3시간 전
        2.출발 3시간 전 경과 후 ~ 출발시간 전
        - 5%
        3. 출발 후 20분까지
        - 15%
        4. 출발 20분 경과 후 ~ 60분
        - 40%
        5. 출발 60분 경과 후
        - 70%

        <금~일, 공휴일, 명절 특별수송기간 승차권>
        1. 무료
        - 1개월 ~ 출발 1일 전
        2. 당일 ~ 출발 3시간 전
        - 5%
        3. 출발 3시간 전 경과 후 ~ 출발시간 전
        - 10%
        4. 출발 후 20분까지
        - 15%
        5. 출발 20분 경과 후 ~ 60분
        - 40%
        6. 출발 60분 경과 후
        - 70%
       `},

       { id:3, title: "비행기", body: `
        1. 항공편 출발까지 예약 취소 없이 탑승하지 않을 시 1매당 예약 부도 위약금 8,000원
        2. 기상이나 항공사 사정으로 결항되어 미 탑승한 항공권은 환불 수수료 면제
       `}
    ]

    return Content;
    
}

