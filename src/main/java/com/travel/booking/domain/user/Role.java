package com.travel.booking.domain.user;

public enum Role {
    ADMIN("관리자"),
    NORMAL("일반");

    private final String displayName; // 한글 이름이나 설명을 저장하기 위한 필드

    // 생성자, 한글 이름을 할당
    Role(String displayName) {
        this.displayName = displayName;
    }

    // 기본 이름을 제공하지 않는 경우 기본 이름을 부여할 수 있음
    Role() {
        this.displayName = this.name(); // ENUM의 기본 이름을 설정
    }

    // 한글 이름 또는 설명을 가져오는 메서드
    public String getDisplayName() {
        return displayName;
    }

    @Override
    public String toString() {
        return this.displayName; // 한글 이름 또는 설명을 반환
    }
}
