package com.travel.booking.domain.payment;

import com.travel.booking.domain.user.UserEntity;
import com.travel.booking.domain.user.UserService;
import com.travel.booking.exception.CustomException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PaymentService {

    public PaymentEntity requestPayment(PaymentEntity payment, String userEmail){
        UserEntity user = UserService.findUser(userEmail);
        if(payment.getAmount() < 1000){
            throw new CustomException(ExceptionCode.INVALID_PAYMENT_AMOUNT);

        }

        payment.setUser(user);
        return PaymentRepo.save(payment);
    }
}
