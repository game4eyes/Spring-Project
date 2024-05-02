package com.travel.booking.domain.user;

import com.travel.booking.domain.payment.PaymentDTO;
import com.travel.booking.domain.payment.PaymentResDTO;
//import com.travel.booking.domain.payment.PaymentService;
import jakarta.validation.Valid;
import org.apache.catalina.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class UserController {

    private UserService userService;
    private UserEntity userEntity;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/join")
    public ResponseEntity<UserEntity> registerUser(@RequestBody UserJoinReq request) {
        UserEntity registeredUser = userService.registerUser(
                request.getUsername(),
                request.getPassword(),
                request.getEmail(),
                request.getPhonenum(),
                request.getGender(),
                request.getCity(),
                request.getStreet(),
                request.getZipcode()
        );

        return ResponseEntity.ok(registeredUser);
    }

}
