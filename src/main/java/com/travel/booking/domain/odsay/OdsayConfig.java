package com.travel.booking.domain.odsay;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter
public class OdsayConfig {
    @Value("${odsay.api.key}")
    private String key;
    @Value("${odsay.api.etcKey}")
    private String etcKey;
    @Value("${odsay.api.requestURI}")
    private String requestURI;
}
