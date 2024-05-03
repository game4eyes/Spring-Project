package com.travel.booking.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers("/security-login/info").authenticated();
                    auth.requestMatchers("/security-login/admin/**").hasAnyAuthority("Admin");
                    auth.anyRequest().permitAll();
                })
                .formLogin(form -> {
                    form
                            .usernameParameter("loginId")
                            .passwordParameter("password")
                            .loginPage("/security-login/login")
                            .defaultSuccessUrl("/security-login")
                            .failureUrl("/security-login/login");
                })
                .logout(logout -> {
                    logout
                            .logoutUrl("/security-login/logout")
                            .invalidateHttpSession(true)
                            .deleteCookies("JSESSIONID");
                });

        return http.build();
    }
}
