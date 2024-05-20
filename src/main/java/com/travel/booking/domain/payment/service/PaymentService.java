package com.travel.booking.domain.payment.service;

import com.travel.booking.domain.payment.entity.Payment;
import com.travel.booking.domain.payment.repository.JpaPaymentRepository;
import com.travel.booking.domain.user.entity.UserEntity;
import com.travel.booking.domain.user.service.UserService;
import com.travel.booking.exception.CustomLogicException;
import com.travel.booking.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class PaymentService {

    private JpaPaymentRepository paymentRepository;
    private UserService userService;


    public Payment requestPayment(Payment payment, String userEmail){
        UserEntity user = userService.FindByEmail(userEmail);
        if (payment.getAmount() < 1000){
            throw new CustomLogicException(ErrorCode.INVAILD_PAYMENT_AMOUNT);
        }
        payment.setCustomer(user);
        return paymentRepository.save(payment);
    }




}
