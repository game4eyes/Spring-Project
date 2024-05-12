package com.travel.booking.domain.user.dto;

import com.travel.booking.domain.user.entity.OauthUser;
import lombok.Getter;

import java.io.Serializable;

@Getter
public class SessionUser implements Serializable {

    // 인증된 사용자 정보만 필요
    private String name;
    private String email;
    private String picture;

    public SessionUser(OauthUser user){
        this.name = user.getName();
        this.email = user.getEmail();
        this.picture = user.getEmail();
    }
}
