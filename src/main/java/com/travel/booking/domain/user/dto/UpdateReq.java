package com.travel.booking.domain.user.dto;

import com.travel.booking.domain.user.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateReq {

    private String email;
    private String username;

}
