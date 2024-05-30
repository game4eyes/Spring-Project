package com.travel.booking.domain.user.dto;

import com.travel.booking.domain.user.Role;
import com.travel.booking.domain.user.entity.User;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@Data
@Builder
public class OAuthAttributes {

    private String provider;
    private Map<String, Object> attributes;
    private String userId;
    private String username;
    private String email;
    private String picture;
    private String nickname;

    public static OAuthAttributes of(String provider, String usernameAttributeName, Map<String, Object> attributes){
        switch (provider){
            case "google":
                return OAuthAttributes.ofGoogle(provider, usernameAttributeName, attributes);
            default:
                throw new RuntimeException("소셜 로그인 접근 실패");
        }
    }


    private static OAuthAttributes ofGoogle(String provider, String usernameAttributeName, Map<String, Object> attributes){

        return OAuthAttributes.builder()
                .provider(provider)
                .attributes(attributes)
                .username(String.valueOf(attributes.get("name")))
                .email(String.valueOf(attributes.get("email")))
                .userId(String.valueOf(attributes.get(usernameAttributeName)))
                .build();
    }

    public Map<String, Object> mapAttribute(){
        Map<String, Object> map = new HashMap<>();
        map.put("userId", userId);
        map.put("username", username);
        map.put("email", email);
        map.put("provider", provider);

        return map;
    }







}