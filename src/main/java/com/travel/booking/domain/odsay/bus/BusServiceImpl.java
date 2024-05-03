package com.travel.booking.domain.odsay.bus;

import com.travel.booking.domain.odsay.ApiDefault;
import com.travel.booking.domain.odsay.OdsayConfig;
import com.travel.booking.domain.odsay.bus.DTO.BusOperationInfoDTO;
import com.travel.booking.domain.odsay.bus.DTO.BusTerminalDTO;
import com.travel.booking.domain.odsay.bus.DTO.BusType;
import com.travel.booking.domain.odsay.bus.DTO.ScheduleDTO;
import com.travel.booking.domain.odsay.stationInfo.StationDTO;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BusServiceImpl implements BusService{
    private final OdsayConfig odsayConfig;
    // 도시 내 버스터미널 리스트(시외 및 고속 버스 터미널 정류장 정보 획득)
    @Override
    public List<BusTerminalDTO> getNearBusTerminalList(String cityCode) {
        List<BusTerminalDTO> busTerminalDTOList = new ArrayList<>();
        StringBuilder urlBuilder = new ApiDefault(odsayConfig).getURLBuilder("/expressBusTerminals",0,odsayConfig.getKey());
        urlBuilder.append("&CID="+cityCode);
        String result = new ApiDefault(odsayConfig).getResult(urlBuilder);
        try {
            JSONParser parser = new JSONParser();
            JSONObject jsonObject = (JSONObject) parser.parse(result);
            JSONArray resultJson = (JSONArray) jsonObject.get("result");
            for (int i = 0; i < resultJson.size(); i++) {
                JSONObject busTerminalJson = (JSONObject) resultJson.get(i);
                System.out.println(busTerminalJson);
                BusTerminalDTO busTerminalDTO = new BusTerminalDTO();
                double x = (double) busTerminalJson.get("x");
                double y = (double) busTerminalJson.get("y");
                String stationName = (String) busTerminalJson.get("stationName");
                Long stationID = (Long) busTerminalJson.get("stationID");
                busTerminalDTO.setStationName(stationName);
                busTerminalDTO.setStationID(stationID);
                busTerminalDTO.setX(x);
                busTerminalDTO.setY(y);
                busTerminalDTO.setStationClass(0);
                busTerminalDTOList.add(busTerminalDTO);
            }
            System.out.println(busTerminalDTOList);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

        return busTerminalDTOList;
    }

    @Override
    public List<BusTerminalDTO> getExpressBusTerminalList(String terminalName) {
        List<BusTerminalDTO> busTerminalDTOList = new ArrayList<>();
        StringBuilder urlBuilder = new ApiDefault(odsayConfig).getURLBuilder("/expressBusTerminals",0,odsayConfig.getKey());
        try {
            urlBuilder.append("&terminalName="+ URLEncoder.encode(terminalName, "UTF-8"));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        String result = new ApiDefault(odsayConfig).getResult(urlBuilder);
        try {
            JSONParser parser = new JSONParser();
            JSONObject jsonObject = (JSONObject) parser.parse(result);
            JSONArray resultJson = (JSONArray) jsonObject.get("result");
            for (int i = 0; i < resultJson.size(); i++) {
                BusTerminalDTO busTerminalDTO = new BusTerminalDTO();
                List<StationDTO> stationDTOList = new ArrayList<>();
                JSONObject busTerminalJson = (JSONObject) resultJson.get(i);
                boolean haveDestinationTerminals = (boolean) busTerminalJson.get("haveDestinationTerminals");
                if (haveDestinationTerminals) {
                    busTerminalDTO.setStationClass(4);
                    busTerminalDTO.setStationID((Long) busTerminalJson.get("stationID"));
                    busTerminalDTO.setX((double) busTerminalJson.get("x"));
                    busTerminalDTO.setY((double) busTerminalJson.get("y"));
                    busTerminalDTO.setStationName((String) busTerminalJson.get("stationName"));
                    JSONArray jsonArray = (JSONArray) busTerminalJson.get("destinationTerminals");
                    for (int j = 0; j < jsonArray.size(); j++) {
                        JSONObject destinationTerminalJson = (JSONObject) jsonArray.get(j);
                        StationDTO stationDTO = new StationDTO();
                        stationDTO.setStationID((Long) destinationTerminalJson.get("stationID"));
                        stationDTO.setStationName((String) destinationTerminalJson.get("stationName"));
                        stationDTO.setX((Double) destinationTerminalJson.get("x"));
                        stationDTO.setY((Double) destinationTerminalJson.get("y"));
                        stationDTOList.add(stationDTO);
                    }
                    busTerminalDTO.setStationDTO(stationDTOList);
                    busTerminalDTOList.add(busTerminalDTO);
                }
            }
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        return busTerminalDTOList;
    }

    @Override
    public List<BusTerminalDTO> getIntercityBusTerminalList(String terminalName) {
        List<BusTerminalDTO> busTerminalDTOList = new ArrayList<>();
        StringBuilder urlBuilder = new ApiDefault(odsayConfig).getURLBuilder("/intercityBusTerminals",0,odsayConfig.getKey());
        try {
            urlBuilder.append("&terminalName="+ URLEncoder.encode(terminalName, "UTF-8"));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        String result = new ApiDefault(odsayConfig).getResult(urlBuilder);
        try {
            JSONParser parser = new JSONParser();
            JSONObject jsonObject = (JSONObject) parser.parse(result);
            JSONArray resultJson = (JSONArray) jsonObject.get("result");
            for (int i = 0; i < resultJson.size(); i++) {
                BusTerminalDTO busTerminalDTO = new BusTerminalDTO();
                List<StationDTO> stationDTOList = new ArrayList<>();
                JSONObject busTerminalJson = (JSONObject) resultJson.get(i);
                boolean haveDestinationTerminals = (boolean) busTerminalJson.get("haveDestinationTerminals");
                if (haveDestinationTerminals) {
                    busTerminalDTO.setStationClass(4);
                    busTerminalDTO.setStationID((Long) busTerminalJson.get("stationID"));
                    busTerminalDTO.setX((double) busTerminalJson.get("x"));
                    busTerminalDTO.setY((double) busTerminalJson.get("y"));
                    busTerminalDTO.setStationName((String) busTerminalJson.get("stationName"));
                    JSONArray jsonArray = (JSONArray) busTerminalJson.get("destinationTerminals");
                    for (int j = 0; j < jsonArray.size(); j++) {
                        JSONObject destinationTerminalJson = (JSONObject) jsonArray.get(j);
                        StationDTO stationDTO = new StationDTO();
                        stationDTO.setStationID((Long) destinationTerminalJson.get("stationID"));
                        stationDTO.setStationName((String) destinationTerminalJson.get("stationName"));
                        stationDTO.setX((Double) destinationTerminalJson.get("x"));
                        stationDTO.setY((Double) destinationTerminalJson.get("y"));
                        stationDTOList.add(stationDTO);
                    }
                    busTerminalDTO.setStationDTO(stationDTOList);
                    busTerminalDTOList.add(busTerminalDTO);
                }
            }
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        return busTerminalDTOList;
    }

    @Override
    public BusOperationInfoDTO getBusOperationInfo(Integer startStationID, Integer endStationID) {
        BusOperationInfoDTO busOperationInfoDTO = new BusOperationInfoDTO();
        List<ScheduleDTO> scheduleDTOList = new ArrayList<>();
        StringBuilder urlBuilder = new ApiDefault(odsayConfig).getURLBuilder("/searchInterBusSchedule",0,odsayConfig.getKey());
        urlBuilder.append("&startStationID="+startStationID);
        urlBuilder.append("&endStationID="+endStationID);
        String result = new ApiDefault(odsayConfig).getResult(urlBuilder);
        try {
            JSONParser parser = new JSONParser();
            JSONObject jsonObject = (JSONObject) parser.parse(result);
            JSONObject resultJson = (JSONObject) jsonObject.get("result");
            Long sStationId = (Long) resultJson.get("startStationID");
            Long eStationId = (Long) resultJson.get("endStationID");
            String startStationName = (String) resultJson.get("startStationName");
            String endStationName = (String) resultJson.get("endStationName");
            String firstTime = (String) resultJson.get("firstTime");
            String lastTime = (String) resultJson.get("lastTime");
            busOperationInfoDTO.setStartStationID(sStationId);
            busOperationInfoDTO.setEndStationID(eStationId);
            busOperationInfoDTO.setStartStationName(startStationName);
            busOperationInfoDTO.setEndStationName(endStationName);
            busOperationInfoDTO.setFirstTime(firstTime);
            busOperationInfoDTO.setLastTime(lastTime);
            JSONArray schedule = (JSONArray) resultJson.get("schedule");
            for (int i = 0; i < schedule.size(); i++) {
                ScheduleDTO busScheduleDTO = new ScheduleDTO();
                JSONObject scheduleJson = (JSONObject) schedule.get(i);
                Long busClass = (Long) scheduleJson.get("busClass");
                String departureTime = (String) scheduleJson.get("departureTime");
                Long wasteTime = (Long) scheduleJson.get("wasteTime");
                Long fare = (Long) scheduleJson.get("fare");
                String busGradeName = BusType.getType(busClass);
                busScheduleDTO.setBusClass(busGradeName);
                busScheduleDTO.setDepartureTime(departureTime);
                busScheduleDTO.setWasteTime(wasteTime);
                busScheduleDTO.setFare(fare);
                scheduleDTOList.add(busScheduleDTO);
            }
            busOperationInfoDTO.setSchedule(scheduleDTOList);

        } catch (ParseException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        return busOperationInfoDTO;
    }
}
