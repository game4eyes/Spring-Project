package com.travel.booking.domain.busInfo;

import com.travel.booking.domain.ariInfo.AirPortDTO;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.*;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BusInfoService {
    private final TerminalListDTO terminalListDTO;

    public List<TerminalListDTO> getTerminalListDTO() {
        List<TerminalListDTO> terminalListDTOs = new ArrayList<>();
        StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1613000/ExpBusInfoService/getExpBusTrminlList");
        try {
            urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=gy2Qb3PpR79FNwFkHURzwSGdSI4xFt5bVWFLrJFs1KeVLPXogpqQ12kCIkz9XdmgGX2%2B%2F4XU5lKmWVezWoYJlw%3D%3D"); /*Service Key*/
            urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("1000", "UTF-8")); /*한 페이지 결과 수*/
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
                    TerminalListDTO terminalListDTO = new TerminalListDTO();
                    JSONObject itemObj = (JSONObject) item.get(i);
                    // 데이터 값이 "NAEK010"으로 넘어와 뒤에서 3글자만 얻는 로직
                    String strid = itemObj.get("terminalId").toString();
                    strid = strid.substring(strid.length()-3, strid.length());
                    // 변환된 string 타입을 long 타입으로 변환
                    Long id = Long.parseLong(strid);
                    terminalListDTO.setTerminalId(id);
                    terminalListDTO.setTerminalNm(itemObj.get("terminalNm").toString());
                    terminalListDTOs.add(terminalListDTO);
                }
                br.close();
                conn.disconnect();
                return terminalListDTOs;
            } else {
                br.close();
                conn.disconnect();
                return null;
            }
        } catch (IOException | ParseException e) {
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }
    }
}
