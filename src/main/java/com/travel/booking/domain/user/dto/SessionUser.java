package com.travel.booking.domain.user.dto;

import com.travel.booking.domain.user.entity.User;
import lombok.Getter;

import java.io.Serializable;

@Getter
public class SessionUser implements Serializable {

    // 인증된 사용자 정보만 필요
    private String username;
    private String email;
    private String picture;

    public SessionUser(User user){
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.picture = user.getEmail();
    }
}
