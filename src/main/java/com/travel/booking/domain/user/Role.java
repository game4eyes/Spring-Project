package com.travel.booking.domain.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {

    USER("Role_User", "일반사용자"),
    ADMIN("Role_admin", "관리자");

    private final String key;
    private final String string;
}
