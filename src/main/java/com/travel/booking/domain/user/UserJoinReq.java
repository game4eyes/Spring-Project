package com.travel.booking.domain.user;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserJoinReq {

    private String username;
    private String password;
    private String email;
    private int phonenum;
    private String gender;
    private String city;
    private String street;
    private String zipcode;
}
