package com.travel.booking.domain.user.controller;

import com.travel.booking.domain.user.service.GoogleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
@RequestMapping(value = "/login/oauth2", produces = "application/json")
public class GoogleSocialController {

    private GoogleService googleService;

    public GoogleSocialController(GoogleService googleService){
        this.googleService = googleService;
    }

    @GetMapping("/code/{registrationId}")
    public void googleLogin(@RequestParam String code, @PathVariable String registrationId){
        googleService.socialLogin(code, registrationId);
    }




}
