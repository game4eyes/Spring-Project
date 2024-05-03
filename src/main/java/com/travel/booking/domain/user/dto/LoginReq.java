package com.travel.booking.domain.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginReq {

    private String loginId;
    private String password;
}
