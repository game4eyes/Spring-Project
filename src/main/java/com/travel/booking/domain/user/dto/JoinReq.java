package com.travel.booking.domain.user.dto;

import com.travel.booking.domain.user.Role;
import com.travel.booking.domain.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class JoinReq {

    private String loginId;

    private String password;

    private String passwordCheck;

    private String username;
    private String email;
    private String birth;
    private String phonenum;
    private String gender;

    public User toEntity(String encodedPassword){ // 비밀번호 암호화 로직
        return User.builder()
                .loginId(this.loginId)
                .password(encodedPassword)
                .username(this.username)
                .email(this.email)
                .phonenum(this.phonenum)
                .gender(this.gender)
                .role(Role.USER)
                .build();
    }


}
