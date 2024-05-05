package com.travel.booking.domain.odsay.train;

import com.travel.booking.domain.odsay.train.DTO.FareDTO;
import com.travel.booking.domain.odsay.train.DTO.FareDetailDTO;
import com.travel.booking.domain.odsay.train.DTO.ResultDTO;
import com.travel.booking.domain.odsay.train.DTO.StationDTO;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.ArrayList;
import java.util.List;

public interface TrainInfoService {
    ResultDTO getTrainInfo(String startStationID, String endStationID);

    default ResultDTO getRsult(JSONObject object) {
        Long startStationID = (Long) object.get("startStationID");
        String startStationName = (String) object.get("startStationName");
        Long endStationID = (Long) object.get("endStationID");
        String endStationName = (String) object.get("endStationName");
        Long count = (Long) object.get("count");
        JSONArray station = (JSONArray) object.get("station");
        List<StationDTO> stationDTOList = new ArrayList<>();
        for (int i = 0; i < station.size(); i++) {
            JSONObject stationObject = (JSONObject) station.get(i);
            stationDTOList.add(getStationList(stationObject));
        }
        return new ResultDTO(startStationID, startStationName,
                endStationID, endStationName, stationDTOList, count);
    }

    default StationDTO getStationList(JSONObject object) {
        String railName = (String) object.get("railName");
        String trainClass = (String) object.get("trainClass");
        Long trainNo = (Long) object.get("trainNo");
        String departureTime = (String) object.get("departureTime");
        String arrivalTime = (String) object.get("arrivalTime");
        String wasteTime = (String) object.get("wasteTime");
        String runDay = (String) object.get("runDay");
        JSONObject generalFare = (JSONObject) object.get("generalFare");
        JSONObject specialFare = (JSONObject) object.get("specialFare");
        JSONObject standingFare = (JSONObject) object.get("standingFare");
        FareDTO fareDTO = getFare(generalFare, specialFare, standingFare);
        return new StationDTO(railName, trainClass, trainNo, departureTime,
                arrivalTime, wasteTime, runDay, fareDTO);
    }

    default FareDTO getFare(JSONObject generalFare, JSONObject specialFare, JSONObject standingFare) {
        return new FareDTO(getFareDetail(generalFare),getFareDetail(specialFare),getFareDetail(standingFare));
    }

    default FareDetailDTO getFareDetail(JSONObject object) {
        String weekday = (String) object.get("weekday");
        String weekend = (String) object.get("weekend");
        String holiday = (String) object.get("holiday");
        return new FareDetailDTO(weekday,weekend,holiday);
    }

}
