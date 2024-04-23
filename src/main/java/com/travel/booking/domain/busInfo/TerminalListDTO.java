package com.travel.booking.domain.busInfo;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Repository;

@Repository
@Getter @Setter
public class TerminalListDTO {
    private Long terminalId;
    private String terminalNm;
}
