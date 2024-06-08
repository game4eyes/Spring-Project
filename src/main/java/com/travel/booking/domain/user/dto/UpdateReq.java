package com.travel.booking.domain.user.dto;

import com.travel.booking.domain.user.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateReq {

    private String email;
    private String username;


    // 비밀번호 변경용
    private String currentPassword;
    private String newPassword;
}
