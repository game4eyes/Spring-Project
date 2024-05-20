package com.travel.booking.domain.payment.Response;

public class SingleResponse<T> extends CommonResponse{
    T data;

    public SingleResponse(T paymentResDTO) {
        super();
    }
}
