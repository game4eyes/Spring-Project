package com.travel.booking.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BCRyptPasswordEncoder {

    @Bean
    public BCRyptPasswordEncoder passwordEncoder(){
        return new BCRyptPasswordEncoder();
    }
}
