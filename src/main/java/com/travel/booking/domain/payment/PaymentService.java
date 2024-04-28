package com.travel.booking.domain.payment;

import com.travel.booking.domain.user.UserEntity;
import com.travel.booking.domain.user.UserService;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    public PaymentEntity requestPayment(PaymentEntity payment, String userEmail){
        UserEntity user = UserService.findUser(userEmail);
        if(payment.getAmount() < 1000){
            throw new CustomLogicExceoption
        }
    }
}
