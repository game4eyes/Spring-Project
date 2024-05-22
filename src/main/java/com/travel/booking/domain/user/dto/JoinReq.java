package com.travel.booking.domain.user.dto;

import com.travel.booking.domain.user.Role;
import com.travel.booking.domain.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class JoinReq {

    private String password;

    private String username;

    private String passwordCheck;

    private String email;

    public User toEntity(String encodedPassword){ // 비밀번호 암호화 로직
        return User.builder()
                .password(encodedPassword)
                .username(this.username)
                .email(this.email)
                .role(Role.USER)
                .build();
    }


}
