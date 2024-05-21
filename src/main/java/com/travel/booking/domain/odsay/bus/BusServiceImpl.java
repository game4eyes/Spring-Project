package com.travel.booking.domain.odsay.bus;

import com.travel.booking.domain.odsay.ApiDefault;
import com.travel.booking.domain.odsay.OdsayConfig;
import com.travel.booking.domain.odsay.bus.DTO.ResultDTO;
import com.travel.booking.domain.odsay.bus.DTO.ScheduleResultDTO;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BusServiceImpl implements BusService {
    private final OdsayConfig odsayConfig;

    @Override
    public List<ResultDTO> getBusTerminal(Long stationClass, String cityCode) {
        StringBuilder urlBuilder = null;
        if (stationClass == 4L) { // 고속 버스 터미널
            urlBuilder = new ApiDefault(odsayConfig).getURLBuilder("/expressBusTerminals",0,odsayConfig.getBakKey());
        } else if (stationClass == 6L) {
            urlBuilder = new ApiDefault(odsayConfig).getURLBuilder("/intercityBusTerminals",0,odsayConfig.getBakKey());
        }
        urlBuilder.append("&CID="+cityCode);
        String result = new ApiDefault(odsayConfig).getResult(urlBuilder);
        JSONArray array = new ApiDefault(odsayConfig).toJSONArray(result);
        return getListResult(array);
    }

    @Override
    public ScheduleResultDTO getSchedule(Long startStationID, Long endStationID) {
        StringBuilder urlBuilder = new ApiDefault(odsayConfig).getURLBuilder("/searchInterBusSchedule",0,odsayConfig.getBakKey());
        urlBuilder.append("&startStationID="+startStationID);
        urlBuilder.append("&endStationID="+endStationID);
        String result = new ApiDefault(odsayConfig).getResult(urlBuilder);
        JSONObject object = new ApiDefault(odsayConfig).getResultJSON(result);
        return getScheduleResult(object);
    }
}
