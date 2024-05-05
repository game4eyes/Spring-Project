package com.travel.booking.domain.odsay;

import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;

@RequiredArgsConstructor
public class ApiDefault {
    private final OdsayConfig odsayConfig;
    // 서비스 uri
    // lang = 국문:0 , 영문:1, 일문:2, 중문(간체):3, 중문(번체):4, 베트남어:5
    // odsayKey = 서비스키
    public StringBuilder getURLBuilder(String serviceURI,int lang,String odsayKey) {
        StringBuilder urlBuilder = new StringBuilder(odsayConfig.getRequestURI());
        try {
            urlBuilder.append(serviceURI);
            urlBuilder.append("?" + URLEncoder.encode("lang", "UTF-8") + "="+lang);
            urlBuilder.append("&" + URLEncoder.encode("apiKey", "UTF-8") + "=" + URLEncoder.encode(odsayKey, "UTF-8"));
            return urlBuilder;
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

    // urlBuilder -> 위 메소드를 사용하여 만든 url에 추가 파라미터 작업을 완료하고
    // 결과값을 반환하는 메서드
    public String getResult(StringBuilder urlBuilder) {
        try {
            URL url = new URL(urlBuilder.toString());
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-type", "application/json");
            BufferedReader br;
            String result;
            if(connection.getResponseCode() >= 200 && connection.getResponseCode() < 300) {
                br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                result = br.readLine();
                br.close();
                connection.disconnect();
            } else {
                connection.disconnect();
                result = "통신 실패";
            }
            return result;
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public JSONObject getResultJSON(String result) {
        JSONParser parser = new JSONParser();
        try {
            JSONObject jsonObject = (JSONObject) parser.parse(result);
            return (JSONObject) jsonObject.get("result");
        } catch (ParseException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
}

