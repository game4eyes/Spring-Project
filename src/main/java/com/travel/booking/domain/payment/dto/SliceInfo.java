package com.travel.booking.domain.payment.dto;

import lombok.Getter;
import org.springframework.data.domain.Pageable;

@Getter
public class SliceInfo {

    private final long getNumber;
    private final long getSize;
    private final long getNumberofElements;
    private final boolean hasNext;
    private final boolean hasPrevious;

    public SliceInfo(Pageable pageable, long getNumberofElements, boolean hasNext){
        this.getNumber = pageable.getPageNumber();
        this.getSize = pageable.getPageSize();
        this.getNumberofElements = getNumberofElements;
        this.hasNext = hasNext;
        this.hasPrevious = pageable.hasPrevious();
    }



}
