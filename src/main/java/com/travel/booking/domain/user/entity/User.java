package com.travel.booking.domain.user.entity;

import com.travel.booking.domain.user.Role;
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

    public void updateUserInfo(String username, String email){
        this.username = username;
        this.email = email;
    }

    public void updatePassword(String newPassword){
        this.password = newPassword;
    }

}
