package com.travel.booking.domain.searchdb.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SearchExceptionCode {
    SEARCH_STATION_TYPE_FAILED("400","정차지의 종류를 입력해 주세요"),
    SEARCH_STATION_INFO_FIND_BY_STATION_TYPE_FAILED("401", "정차지의 종류를 찾았으나 아직 데이터가 없습니다."),
    SEARCH_START_STATION_INFO_FIND_FAILED("402", "출발지를 찾지 못하였습니다. 다시 확인해주세요"),
    SEARCH_START_STATION_INFO_FIND_BY_START_STATION_ID_FAILED("403", "출발지에 해당하는 도착지의 정보를 찾지 못하였습니다.");

    private final String code;
    private final String message;
}
