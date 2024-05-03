package com.travel.booking.domain.odsay.bus;

import com.travel.booking.domain.odsay.bus.DTO.BusOperationInfoDTO;
import com.travel.booking.domain.odsay.bus.DTO.BusTerminalDTO;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BusService {
    // 도시코드 내 고속 & 시외 버스 터미널 정보
    List<BusTerminalDTO> getNearBusTerminalList(String cityCode);
    // terminalName의 값이 하나라도 들어가는 터미널의 정보를 나열
    // 출발지 및 도착지 정보 획득 가능
    // 지도에 마커로 표시할 것
    List<BusTerminalDTO> getExpressBusTerminalList(String terminalName);
    List<BusTerminalDTO> getIntercityBusTerminalList(String terminalName);
    // 필요 파람값
    // 출발 터미널 ID = startStationID
    // 도착 터미널 ID = endStationID
    BusOperationInfoDTO getBusOperationInfo(Integer startStationID, Integer endStationID);

}
