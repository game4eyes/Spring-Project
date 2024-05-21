package com.travel.booking.domain.payment.dto;

import lombok.*;

import java.util.List;

@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SliceResponseDto<T> {

    List<T> data;

    SliceInfo sliceInfo;
}
