package com.travel.booking.domain.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "USERS")
public class UserEntity {

    @Id
    @GeneratedValue
    @Column(name = "USER_ID")
    private String id;
    @Column(name = "USERNAME")
    private String username;
    private String password;
    private String email;
    private int phonenum;
    private String gender;

    @Embedded
    private Address address;
}
