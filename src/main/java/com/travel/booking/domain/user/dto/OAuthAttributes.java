package com.travel.booking.domain.user.dto;

import com.travel.booking.domain.user.Role;
import com.travel.booking.domain.user.entity.OauthUser;
import com.travel.booking.domain.user.entity.UserEntity;
import lombok.Builder;
import lombok.Getter;
import org.springframework.security.core.userdetails.User;

import java.util.Map;

@Getter
public class OAuthAttributes {

    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String name;
    private String email;
    private String picture;

    @Builder
    public OAuthAttributes(Map<String, Object> attributes,
                           String nameAttributeKey, String name,
                           String email, String picture) {
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.name = name;
        this.email = email;
        this.picture = picture;
    }

    // OAuth2User에서 반환하는 사용자 정보는 Map
    // 따라서 값 하나하나를 변환해야 한다.
    public static OAuthAttributes of(String registrationId,
                                     String userNameAttributeName,
                                     Map<String, Object> attributes) {

        return ofGoogle(userNameAttributeName, attributes);
    }

    // 구글 생성자
    private static OAuthAttributes ofGoogle(String usernameAttributeName,
                                            Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .picture((String) attributes.get("picture"))
                .attributes(attributes)
                .nameAttributeKey(usernameAttributeName)
                .build();
    }

    // User 엔티티 생성
    public OauthUser toEntity() {
        return OauthUser.builder()
                .name(name)
                .email(email)
                .picture(picture)
                .role(Role.USER)
                .build();
    }
}