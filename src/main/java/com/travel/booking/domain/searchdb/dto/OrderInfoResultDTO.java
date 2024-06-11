package com.travel.booking.domain.searchdb.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.travel.booking.domain.booking.entity.Order;
import com.travel.booking.domain.searchdb.entity.Schedule;
import com.travel.booking.domain.searchdb.entity.Stationinfo;
import lombok.*;
import org.springframework.security.core.parameters.P;

import java.time.LocalDate;

@Builder
@AllArgsConstructor
@Getter @Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OrderInfoResultDTO {
    private String startName;
    private String endName;
    private String departureTime;
    private String arrivalTime;
    private String grade;
    private String operatorName;
    private String railName;
    private LocalDate orderDate;

    public static OrderInfoResultDTO fromOrderAndSchedule(Order order, Schedule schedule, Stationinfo startStation, Stationinfo endStation) {
        if (order.getOrderStatus().equals("결제 완료")) {
            if (startStation.getStationType().getId() == 1) {
                return OrderInfoResultDTO.builder()
                        .startName(startStation.getStationName())
                        .endName(endStation.getStationName())
                        .orderDate(order.getOrderDate())
                        .departureTime(schedule.getDepartureTime())
                        .arrivalTime(schedule.getArrivalTime())
                        .grade(schedule.getCarrier())
                        .operatorName("고속 버스")
                        .railName(startStation.getStationName() + " -> " + endStation.getStationName())
                        .build();
            } else if (startStation.getStationType().getId() == 2) {
                return OrderInfoResultDTO.builder()
                        .startName(startStation.getStationName())
                        .endName(endStation.getStationName())
                        .orderDate(order.getOrderDate())
                        .departureTime(schedule.getDepartureTime())
                        .arrivalTime(schedule.getArrivalTime())
                        .grade(order.getGrade())
                        .operatorName(schedule.getCarrier().split(",")[0])
                        .railName(schedule.getFrequency())
                        .build();
            } else if (startStation.getStationType().getId() == 3) {
                return OrderInfoResultDTO.builder()
                        .startName(startStation.getStationName())
                        .endName(endStation.getStationName())
                        .orderDate(order.getOrderDate())
                        .departureTime(schedule.getDepartureTime())
                        .arrivalTime(schedule.getArrivalTime())
                        .grade(order.getGrade())
                        .operatorName(schedule.getCarrier().split(",")[0])
                        .railName(schedule.getFrequency() + "번 열차")
                        .build();
            }
        }
        return null;
    }
}
