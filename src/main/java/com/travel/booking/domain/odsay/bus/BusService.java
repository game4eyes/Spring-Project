package com.travel.booking.domain.odsay.bus;

import com.travel.booking.domain.odsay.bus.DTO.DetailDTO;
import com.travel.booking.domain.odsay.bus.DTO.ResultDTO;
import com.travel.booking.domain.odsay.bus.DTO.ScheduleResultDTO;
import com.travel.booking.domain.odsay.bus.DTO.StationDTO;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.ArrayList;
import java.util.List;

public interface BusService {
    List<ResultDTO> getBusTerminal(Long stationClass, String cityCode);

    ScheduleResultDTO getSchedule(Long startStationID, Long endStationID);

    default List<ResultDTO> getListResult(JSONArray array) {
        List<ResultDTO> list = new ArrayList<>();
        for (Object o : array) {
            JSONObject obj = (JSONObject) o;
            if ((boolean) obj.get("haveDestinationTerminals")) {
                System.out.println(obj);
                ResultDTO resultDTO = getResult(obj);
                list.add(resultDTO);
            }
        }
        return list;
    }

    default ResultDTO getResult(JSONObject obj) {
        Long stationID = (Long) obj.get("stationID");
        String stationName = (String) obj.get("stationName");
        double x = (double) obj.get("x");
        double y = (double) obj.get("y");
        JSONArray dt = (JSONArray) obj.get("destinationTerminals");
        List<StationDTO> stations = getStationList(dt);
        return new ResultDTO(stationID, stationName, x, y, stations);
    }

    default List<StationDTO> getStationList(JSONArray dt) {
        List<StationDTO> list = new ArrayList<>();
        for (Object o : dt) {
            JSONObject obj = (JSONObject) o;
            StationDTO stationDTO = getStation(obj);
            list.add(stationDTO);
        }
        return list;
    }

    default StationDTO getStation(JSONObject obj) {
        Long stationID = (Long) obj.get("stationID");
        String stationName = (String) obj.get("stationName");
        double x = (double) obj.get("x");
        double y = (double) obj.get("y");
        return new StationDTO(stationID, stationName, x, y);
    }

    default ScheduleResultDTO getScheduleResult(JSONObject object) {
        Long count = (Long) object.get("count");
        Long stationClass = (Long) object.get("stationClass");
        Long startStationID = (Long) object.get("startStationID");
        String startStationName = (String) object.get("startStationName");
        Long endStationID = (Long) object.get("endStationID");
        String endStationName = (String) object.get("endStationName");
        String firstTime = (String) object.get("firstTime");
        String lastTime = (String) object.get("lastTime");
        JSONArray schedule = (JSONArray) object.get("schedule");
        List<DetailDTO> list = getDetailList(schedule);
        return new ScheduleResultDTO(count, stationClass, startStationID, startStationName,
                endStationID, endStationName, firstTime, lastTime, list);
    }

    default List<DetailDTO> getDetailList(JSONArray schedule) {
        List<DetailDTO> list = new ArrayList<>();
        for (Object o : schedule) {
            JSONObject obj = (JSONObject) o;
            DetailDTO detailDTO = getDetail(obj);
            list.add(detailDTO);
        }
        return list;
    }

    default DetailDTO getDetail(JSONObject obj) {
        Long busClass = (Long) obj.get("busClass");
        String departureTime = (String) obj.get("departureTime");
        Long wasteTime = (Long) obj.get("wasteTime");
        Long fare = (Long) obj.get("fare");
        return new DetailDTO(busClass, departureTime, wasteTime, fare);
    }

}
