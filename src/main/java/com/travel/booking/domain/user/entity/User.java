package com.travel.booking.domain.user.entity;

import com.travel.booking.domain.user.Role;
import com.travel.booking.domain.user.dto.OAuthAttributes;
import jakarta.persistence.*;
import lombok.*;

import java.util.Map;

@Entity
@Getter @Setter
@Table(name = "USERS")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ID")
    private Long id;

    private String email;

    @Column(nullable = false)
    private String username;

    private String password;


    @Enumerated(EnumType.STRING)
    private Role role;

    private Long point;


    @Builder
    public User(String username, String email,  Role role){
        this.username = username;
        this.email = email;
        this.role = role;
    }

    public User update(String username, String picture){
        this.username = username;

        return this;
    }

    public User(String email) {
        this.email = email;
    }

    public String getRoleKey(){
        return this.role.getKey();
    }

    // OAuth2User에서 반환하는 사용자 정보는 Map이기 때문에 값 하나하나를 변환해야한다.
    private static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .username((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .attributes(attributes)
                .build();
    }

}
