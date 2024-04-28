package com.travel.booking.domain.user;

import com.travel.booking.domain.payment.PaymentDTO;
import com.travel.booking.domain.payment.PaymentResDTO;
import jakarta.validation.Valid;
import org.apache.catalina.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class UserController {

    public ResponseEntity requestPayment(@AuthenticationPrincipal User principal, @RequestBody @Valid PaymentDTO paymentDTO){
        PaymentResDTO paymentResDTO = payments
    }
}
