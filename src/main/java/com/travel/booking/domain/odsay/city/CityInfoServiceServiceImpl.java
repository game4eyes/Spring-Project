package com.travel.booking.domain.odsay.city;

import com.travel.booking.domain.odsay.ApiDefault;
import com.travel.booking.domain.odsay.OdsayConfig;
import com.travel.booking.domain.odsay.city.DTO.CityDTO;
import com.travel.booking.domain.odsay.city.DTO.CityInfoDTO;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CityInfoServiceServiceImpl implements CityInfoService {
    private final OdsayConfig odsayConfig;
    // 도시 코드 얻기 위한 메소드
    @Override
    public List<CityDTO> getCityList(String cityRegion) {
        StringBuilder urlBuilder = new ApiDefault(odsayConfig).getURLBuilder("/searchCID", 0, odsayConfig.getEtcKey());
        try {
            String result = new ApiDefault(odsayConfig).getResult(urlBuilder);
            JSONParser parser = new JSONParser();
            JSONObject jsonObject = (JSONObject) parser.parse(result);
            JSONObject resultJson = (JSONObject) jsonObject.get("result");
            JSONArray cid = (JSONArray) resultJson.get("CID");

            // 도시 정보를 먼저 추출하고 필터링
            List<CityDTO> cityDtoList = new ArrayList<>();
            Map<String, List<CityInfoDTO>> groupedCities = new HashMap<>();

            for (Object item : cid) {
                JSONObject cityJson = (JSONObject) item;
                String regionName = (String) cityJson.get("cityRegion");
                String cityName = (String) cityJson.get("cityName");
                String cityCode = (String) cityJson.get("cityCode");

                CityInfoDTO cityInfoDTO = new CityInfoDTO();
                cityInfoDTO.setCityName(cityName);
                cityInfoDTO.setCityCode(cityCode);

                groupedCities.computeIfAbsent(regionName, k -> new ArrayList<>()).add(cityInfoDTO);
            }

            // 필터링된 지역의 도시 정보만 반환
            if (groupedCities.containsKey(cityRegion)) {
                CityDTO cityDTO = new CityDTO();
                cityDTO.setCityRegion(cityRegion);
                cityDTO.setCityInfoDTO(groupedCities.get(cityRegion));
                cityDtoList.add(cityDTO);
            }

            return cityDtoList;
        } catch (ParseException e) {
            e.printStackTrace();
            throw new RuntimeException("JSON parsing error in getCityList", e);
        }
    }
}
