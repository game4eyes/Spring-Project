package com.travel.booking.domain.payment.service;

import com.travel.booking.domain.payment.config.TossPaymentConfig;
import com.travel.booking.domain.payment.dto.PaymentSuccessDto;
import com.travel.booking.domain.payment.entity.Payment;
import com.travel.booking.domain.payment.repository.JpaPaymentRepository;
import com.travel.booking.domain.user.entity.User;
import com.travel.booking.domain.user.service.UserService;
import com.travel.booking.exception.CustomLogicException;
import com.travel.booking.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Collections;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class PaymentService {

    private final JpaPaymentRepository paymentRepository;
    private final UserService userService;
    private final TossPaymentConfig tossPaymentConfig;


    @Transactional
    public Payment requestPayment(Payment payment, String userEmail){
        User user = userService.FindByEmail(userEmail);
        if (payment.getAmount() < 1000) {
            throw new CustomLogicException(ErrorCode.INVALID_PAYMENT_AMOUNT);
        }

        payment.setCustomer(user);
        payment.setUserEmail(user.getEmail());
        return paymentRepository.save(payment);
    }

    @Transactional
    public PaymentSuccessDto tossPaymentSuccess(String paymentKey, String orderId, Long amount){
        Payment payment = verifyPayment(orderId, amount); // 요쳥가격 = 결제된 금액
        PaymentSuccessDto result = requestPaymentAccept(paymentKey,orderId,amount);
        payment.setPaymentKey(paymentKey);
        payment.setPaySuccessYN(true);
        payment.getCustomer().setPoint(payment.getCustomer().getPoint() + amount);
        return result;
    }

    @Transactional
    public Payment verifyPayment(String orderId, Long amount){
        Payment payment = paymentRepository.findByOrderId(orderId).orElseThrow(() -> {
            throw new CustomLogicException(ErrorCode.PAYMENT_NOT_FOUND);
        });
        if(!payment.getAmount().equals(amount)){
            throw new CustomLogicException(ErrorCode.PAYMENT_AMOUNT_EXP);
        }
        return payment;
    }

    @Transactional
    public PaymentSuccessDto requestPaymentAccept(String paymentKey, String orderId, Long amount){
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = getHeaders();
        JSONObject params = new JSONObject();
        params.put("orderId", orderId);
        params.put("amount", amount);

        PaymentSuccessDto result = null;
        try{
            result = restTemplate.postForObject(TossPaymentConfig.URL + paymentKey,
            // 최종 결제 승인 요청 / 요청 URL = config에 작성한 https://api.tosspayments.com/v1/payments/
            new HttpEntity<>(params, headers),
                    PaymentSuccessDto.class);
        } catch (Exception e){
            throw new CustomLogicException(ErrorCode.ALREADY_APPROVED);
        }

        return result;
    }

    private HttpHeaders getHeaders(){ // 요청 헤더에 꼭 authorization 넣어줘야함. 시크릿 키를 base64로 인코딩
        HttpHeaders headers = new HttpHeaders();
        String encodedAuthKey = new String(
                Base64.getEncoder().encode((tossPaymentConfig.getSecretKey() + ":").getBytes(StandardCharsets.UTF_8)));
        // basic authorization 인가 코드를 보낼 때 시크릿 키를 base64를 이용하여 인코딩하는데
        // 이 때, {시크릿키 + ":"} 조합으로 인코딩 해야함
        headers.setBasicAuth(encodedAuthKey);
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        return headers;
    }


    public void tossPaymentFail(String code, String msg, String orderId){
        Payment payment = paymentRepository.findByOrderId(orderId).orElseThrow(() -> {
            throw new CustomLogicException(ErrorCode.PAYMENT_NOT_FOUND);
        });
        payment.setPaySuccessYN(false);
        payment.setFailReason(msg);
    }

    @Transactional
    public Map cancelPaymentPoint(String userEmail, String paymetKey, String cancelReason){
        Payment payment = paymentRepository.findByPaymentKeyAndCustomer_Email(paymetKey, userEmail)
                .orElseThrow(() -> {
                    throw new CustomLogicException(ErrorCode.PAYMENT_NOT_FOUND);
                });
        // 취소시 포인트가 없으면 환불 불가
        if(payment.getCustomer().getPoint() >= payment.getAmount()){
            payment.setCancelYN(true);
            payment.setCancelReason(cancelReason);
            payment.getCustomer().setPoint(payment.getCustomer().getPoint() - payment.getAmount());
            return tossPaymentCancel(paymetKey, cancelReason);
        }

        throw new CustomLogicException(ErrorCode.PAYMENT_NOT_ENOUGH_POINT);
    }


    public Map tossPaymentCancel(String paymentKey, String cancelReason){
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = getHeaders();
        JSONObject params = new JSONObject();
        params.put("cancelReason", cancelReason);

        return restTemplate.postForObject(TossPaymentConfig.URL + paymentKey + "/cancel",
                new HttpEntity<>(params, headers),
                Map.class
                );
    }

    public Slice<Payment> findAllChargingHistories(String username, Pageable pageable){
        userService.verifyMember(username);
        return paymentRepository.findAllByCustomer_Email(username,
                PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
                        Sort.Direction.DESC, "paymentId")
                );
    }




}
