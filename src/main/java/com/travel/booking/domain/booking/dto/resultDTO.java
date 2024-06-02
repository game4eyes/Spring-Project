package com.travel.booking.domain.booking.dto;

import com.travel.booking.domain.booking.entity.Order;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter @Setter
public class resultDTO {
    private String id;
    private Long userId;
    private LocalDate orderDate;
    private String orderStatus;
    private String grade;
    private Integer orderSeatNum;

    public resultDTO() {}
    public resultDTO(Order order) {
        this.id = order.getId();
        this.userId = order.getUser().getId();
        this.orderDate = order.getOrderDate();
        this.orderStatus = order.getOrderStatus();
        this.grade = order.getGrade();
        this.orderSeatNum = order.getOrderSeatNum();

    }
}
