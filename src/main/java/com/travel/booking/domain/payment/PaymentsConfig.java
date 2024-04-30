package com.travel.booking.domain.payment;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter
public class PaymentsConfig {

    @Value("${payment.toss.test_client_api_key}")
    private String testClientApiKey;

    @Value("${payment.toss.test_secrete_api_key}")
    private String testSecretKey;

    @Value("${payment.toss.success_url}")
    private String successUrl;

    @Value("${payment.toss.fail_url}")
    private String failUrl;

    // 결제승인 요청보낼 URL
    public static final String URL = "https://api.tosspayments.com/v1/payments/";


}
