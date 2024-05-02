package com.travel.booking.domain.user;

import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class UserRepository {

    public <T> Optional findByLoginId(String username) {
        return null;
    }

}
