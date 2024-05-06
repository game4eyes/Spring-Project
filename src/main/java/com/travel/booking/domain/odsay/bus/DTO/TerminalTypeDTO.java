package com.travel.booking.domain.odsay.bus.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class TerminalTypeDTO {
    private List<BusTerminalDTO> expressTerminalDTO;
    private List<BusTerminalDTO> interCityTerminalDTO;
}
