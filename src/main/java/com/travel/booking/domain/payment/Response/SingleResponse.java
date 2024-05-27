package com.travel.booking.domain.payment.Response;

public class SingleResponse<T> extends CommonResponse {
    private T data;

    // 기본 생성자
    public SingleResponse() {
        super();
    }

    // 데이터 필드를 설정하는 생성자
    public SingleResponse(T data) {
        super();
        this.data = data;
    }

    // Getter와 Setter
    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
