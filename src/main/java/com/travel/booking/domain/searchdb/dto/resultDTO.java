package com.travel.booking.domain.searchdb.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.travel.booking.domain.booking.entity.SeatAvailability;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class resultDTO {
    private Long scheduleId;
    // 버스 좌석 가용성 관리 컬럼
    private Integer busSeat;
    // 기차 좌석 가용성 관리 컬럼
    private Integer trainStandingFreeSeating;
    private Integer trainGeneral;
    private Integer trainSpecial;
    // 항공 좌석 가용성 관리 컬럼
    private Integer airEconomy;
    private Integer airBusiness;
    private Integer airFirst;

    public resultDTO() {}

    public resultDTO(Long StationType, SeatAvailability seat) {
        this.scheduleId = seat.getSchedule().getId();
        if (StationType == 1) {
            this.busSeat = seat.getBusSeat();
        } else if (StationType == 2) {
            this.airBusiness = seat.getAirBusiness();
            this.airEconomy = seat.getAirEconomy();
            this.airFirst = seat.getAirFirst();
        } else if (StationType == 3) {
            this.trainGeneral = seat.getTrainGeneral();
            this.trainSpecial = seat.getTrainSpecial();
            this.trainStandingFreeSeating = seat.getTrainStandingFreeSeating();
        }
    }
}
