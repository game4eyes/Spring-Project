package com.travel.booking.domain.ariInfo;

import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.*;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class AirInfoService {
    private final AirPortDTO airPortDTO;
    private final AirLineDTO airLineDTO;
    // 공항 목록 조회
    public ArrayList<AirPortDTO> getAirPortDTO() {
        ArrayList<AirPortDTO> airPortDTOs = new ArrayList<>();
        StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getArprtList"); /*URL*/
        try {
            urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=gy2Qb3PpR79FNwFkHURzwSGdSI4xFt5bVWFLrJFs1KeVLPXogpqQ12kCIkz9XdmgGX2%2B%2F4XU5lKmWVezWoYJlw%3D%3D"); /*Service Key*/
            urlBuilder.append("&" + URLEncoder.encode("_type","UTF-8") + "=" + URLEncoder.encode("json", "UTF-8")); /*데이터 타입(xml, json)*/
            URL url = new URL(urlBuilder.toString());
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-type", "application/json");
            BufferedReader br = null;
            String result;
            if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
                br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
                result = br.readLine();
                JSONParser parser = new JSONParser();
                JSONObject object = (JSONObject) parser.parse(result);
                JSONObject response = (JSONObject) object.get("response");
                JSONObject body = (JSONObject) response.get("body");
                JSONObject items = (JSONObject) body.get("items");
                JSONArray item = (JSONArray) items.get("item");
                for (int i = 0; i < item.size(); i++) {
                    JSONObject itemObj = (JSONObject) item.get(i);
                    AirPortDTO airPortDTO = new AirPortDTO();
                    airPortDTO.setAirportId(itemObj.get("airportId").toString());
                    airPortDTO.setAirportNm(itemObj.get("airportNm").toString());
                    airPortDTOs.add(airPortDTO);
                }
                br.close();
                conn.disconnect();
                return airPortDTOs;
            } else {
                br.close();
                conn.disconnect();
                return null;
            }
        } catch (IOException | ParseException e) {
            throw new RuntimeException(e);
        }
    }
    // 항공사 목록 조회
    public ArrayList<AirLineDTO> getAirLineDTO() {
        ArrayList<AirLineDTO> airLineDTOS = new ArrayList<>();
        StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getAirmanList"); /*URL*/
        try {
            urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=gy2Qb3PpR79FNwFkHURzwSGdSI4xFt5bVWFLrJFs1KeVLPXogpqQ12kCIkz9XdmgGX2+/4XU5lKmWVezWoYJlw=="); /*Service Key*/
            urlBuilder.append("&" + URLEncoder.encode("_type","UTF-8") + "=" + URLEncoder.encode("json", "UTF-8")); /*데이터 타입(xml, json)*/
            URL url = new URL(urlBuilder.toString());
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-type", "application/json");
            BufferedReader br = null;
            String result;
            if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
                br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
                result = br.readLine();
                JSONParser parser = new JSONParser();
                JSONObject object = (JSONObject) parser.parse(result);
                JSONObject response = (JSONObject) object.get("response");
                JSONObject body = (JSONObject) response.get("body");
                JSONObject items = (JSONObject) body.get("items");
                JSONArray item = (JSONArray) items.get("item");
                for (int i = 0; i < item.size(); i++) {
                    JSONObject itemObj = (JSONObject) item.get(i);
                    AirLineDTO airLineDTO = new AirLineDTO();
                    airLineDTO.setAirlineId(itemObj.get("airlineId").toString());
                    airLineDTO.setAirlineNm(itemObj.get("airlineNm").toString());
                    airLineDTOS.add(airLineDTO);
                }
                br.close();
                conn.disconnect();
                return airLineDTOS;
            } else {
                br.close();
                conn.disconnect();
                return null;
            }
        } catch (IOException | ParseException e) {
            throw new RuntimeException(e);
        }
    }
}
