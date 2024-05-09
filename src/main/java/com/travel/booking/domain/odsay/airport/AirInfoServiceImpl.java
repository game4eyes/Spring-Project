package com.travel.booking.domain.odsay.airport;

import com.travel.booking.domain.odsay.ApiDefault;
import com.travel.booking.domain.odsay.OdsayConfig;
import com.travel.booking.domain.odsay.airport.DTO.ResultDTO;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AirInfoServiceImpl implements AirInfoService {
    private final OdsayConfig odsayConfig;
    @Override
    public ResultDTO getAirInfo(String startStationID, String endStationID, Long hour, char dayz) {
        StringBuilder urlBuilder = new ApiDefault(odsayConfig).getURLBuilder("/airServiceTime",0,odsayConfig.getKey());
        urlBuilder.append("&startStationID="+startStationID);
        urlBuilder.append("&endStationID="+endStationID);
        String result = new ApiDefault(odsayConfig).getResult(urlBuilder);
        JSONObject resultObject = new ApiDefault(odsayConfig).getResultJSON(result);
        ResultDTO resultDTO = getResult(resultObject);
        return getFilteredResult(resultDTO, hour, dayz);
    }
}
