package com.travel.booking.domain.payment.service;

import com.travel.booking.domain.payment.entity.Payment;
import com.travel.booking.domain.payment.repository.JpaPaymentRepository;
import com.travel.booking.domain.user.entity.UserEntity;
import com.travel.booking.domain.user.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PaymentService {

    private JpaPaymentRepository paymentRepository;
    private UserService userService;


    public Payment requestTossPayment(Payment payment, String userEmail){
        UserEntity user = userService.FindByEmail(userEmail);
        if (payment.getAmount() < 1000){
            throw new CustomLogicException(ExceptionCode.INVAILD_PAYMENT_AMOUNT);
        }
        payment.setCustomer(user);
        return paymentRepository.save(payment);
    }




}
