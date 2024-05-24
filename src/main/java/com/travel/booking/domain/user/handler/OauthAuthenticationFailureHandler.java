package com.travel.booking.domain.user.handler;

import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

public class OauthAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    private final HttpCookieOauthrizationRequesRepository httpCookieOauthrizationRequesRepository;







}
