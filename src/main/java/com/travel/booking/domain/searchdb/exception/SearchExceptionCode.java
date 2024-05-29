package com.travel.booking.domain.searchdb.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SearchExceptionCode {
    SEARCH_STATION_TYPE_FAILED("400","정차지의 종류를 입력해 주세요"),
    SEARCH_STATION_INFO_FIND_BY_STATION_TYPE_FAILED("401", "정차지의 종류를 찾았으나 아직 데이터가 없습니다.");

    private final String code;
    private final String message;
}
