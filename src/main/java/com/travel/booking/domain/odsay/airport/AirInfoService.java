package com.travel.booking.domain.odsay.airport;

import com.travel.booking.domain.odsay.airport.DTO.ResultDTO;
import com.travel.booking.domain.odsay.airport.DTO.StationDTO;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.ArrayList;
import java.util.List;

public interface AirInfoService {
    ResultDTO getAirInfo(String startStationID, String endStationID, Long hour, char dayz);

    default ResultDTO getResult(JSONObject object) {
        Long startStationID = (Long) object.get("startStationID");
        String startStationName = (String) object.get("startStationName");
        Long endStationID = (Long) object.get("endStationID");
        String endStationName = (String) object.get("endStationName");
        Long count = (Long) object.get("count");
        JSONArray station = (JSONArray) object.get("station");
        List<StationDTO> stationDTOList = new ArrayList<>();
        for (int i = 0; i < station.size(); i++) {
            JSONObject stationObject = (JSONObject) station.get(i);
            StationDTO stationDTO = getStationDTO(stationObject);
            stationDTOList.add(stationDTO);
        }
        return new ResultDTO(startStationID, startStationName,
                endStationID, endStationName, stationDTOList, count);
    }

    default StationDTO getStationDTO(JSONObject object) {
        String airline = (String) object.get("airline");
        String departureTime = (String) object.get("departureTime");
        String arrivalTime = (String) object.get("arrivalTime");
        String flight = (String) object.get("flight");
        String runDay = (String) object.get("runDay");
        return new StationDTO(airline, departureTime, arrivalTime, flight, runDay);
    }

    default ResultDTO getFilteredResult(ResultDTO object, Long hour, char dayz) {
        List<StationDTO> stationDTOList = object.getStation();
        List<StationDTO> filteredStationDTOList = new ArrayList<>();
        for (StationDTO stationDTO : stationDTOList) {
            // 시간 파싱 로직 개선 필요 (예: "08:00"에서 "08"만 추출)
            Long depTime = Long.parseLong(stationDTO.getDepartureTime().split(":")[0]);
            if (depTime >= hour) {
                String runDays = stationDTO.getRunDay();
                if (runDays.equals("매일") || runDays.contains(String.valueOf(dayz))) {
                    filteredStationDTOList.add(stationDTO);
                }
            }
        }
        return new ResultDTO(object, filteredStationDTOList);
    }
}
