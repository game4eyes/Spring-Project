package com.travel.booking.domain.searchdb.dto;

import com.travel.booking.domain.searchdb.entity.Trainprice;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class TrainPriceDTO {
    private int general;
    private int special;

    public TrainPriceDTO() {}
    public TrainPriceDTO(Trainprice trainprice) {
        this.general = trainprice.getGeneral();
        this.special = trainprice.getSpecial();
    }
}
