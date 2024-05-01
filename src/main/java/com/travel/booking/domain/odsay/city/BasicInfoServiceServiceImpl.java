package com.travel.booking.domain.odsay.city;

import com.travel.booking.domain.odsay.ApiDefault;
import com.travel.booking.domain.odsay.OdsayConfig;
import com.travel.booking.domain.odsay.city.DTO.CityDTO;
import com.travel.booking.domain.odsay.city.DTO.StationDTO;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BasicInfoServiceServiceImpl implements BasicInfoService {
    private final OdsayConfig odsayConfig;
    // 도시 코드 얻기 위한 메소드
    public List<CityDTO> getCityList() {
        List<CityDTO> cityDtoList = new ArrayList<>();
        StringBuilder urlBuilder =  new ApiDefault(odsayConfig).getURLBuilder("/searchCID",0,odsayConfig.getEtcKey());
        try {
            String result = new ApiDefault(odsayConfig).getResult(urlBuilder);
            System.out.println(result);
            JSONParser parser = new JSONParser();
            JSONObject jsonObject = (JSONObject) parser.parse(result);
            JSONObject resultJson = (JSONObject) jsonObject.get("result");
            JSONArray cid = (JSONArray) resultJson.get("CID");
            for (int i = 0; i < cid.size(); i++) {
                JSONObject cityJson = (JSONObject) cid.get(i);
                String cityName = (String) cityJson.get("cityName");
                String cityRegion = (String) cityJson.get("cityRegion");
                String cityCode = (String) cityJson.get("cityCode");
                CityDTO cityDTO = new CityDTO();
                cityDTO.setCityName(cityName);
                cityDTO.setCityRegion(cityRegion);
                cityDTO.setCityCode(cityCode);
                cityDtoList.add(cityDTO);
            }
            return cityDtoList;
        } catch (ParseException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    // 대중교통 poi 정보를 얻기 위한 메소드
    // 1 : 버스정류장
    // 2 : 지하철역
    // 3 : 기차역(고속 철도)
    // 4 : 고속버스터미널
    // 5 : 공항
    // 6 : 시외버스터미널
    @Override
    public List<StationDTO> getStationList(String stationClass) {
        List<StationDTO> stationDtoList = new ArrayList<>();
        StringBuilder urlBuilder = new ApiDefault(odsayConfig).getURLBuilder("/boundarySearch",0,odsayConfig.getKey());
        try {
            urlBuilder.append("&param=124.5:38.9:132.0:33");
            urlBuilder.append("&stationClass="+stationClass);
            String result = new ApiDefault(odsayConfig).getResult(urlBuilder);
            JSONParser parser = new JSONParser();
            JSONObject jsonObject = (JSONObject) parser.parse(result);
            JSONObject resultJson = (JSONObject) jsonObject.get("result");
            JSONArray station = (JSONArray) resultJson.get("station");
            for (int i = 0; i < station.size(); i++) {
                JSONObject stationJson = (JSONObject) station.get(i);
                String stationName = (String) stationJson.get("stationName");
                Long stationID = (Long) stationJson.get("stationID");
                double x = (double) stationJson.get("x");
                double y = (double) stationJson.get("y");
                String arsID = (String) stationJson.get("arsID");
                StationDTO stationDTO = new StationDTO();
                stationDTO.setStationName(stationName);
                stationDTO.setStationID(stationID);
                stationDTO.setX(x);
                stationDTO.setY(y);
                stationDTO.setArsID(arsID);
                stationDtoList.add(stationDTO);
            }
            return stationDtoList;
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }



}
