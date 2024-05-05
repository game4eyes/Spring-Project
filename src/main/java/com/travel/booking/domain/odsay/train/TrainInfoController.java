package com.travel.booking.domain.odsay.train;


import com.travel.booking.domain.odsay.train.DTO.ResultDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/train")
public class TrainInfoController {
    private final TrainInfoServiceImpl trainInfoService;

    @GetMapping("/{startStationID}/{endStationID}")
    public ResultDTO getTrainInfo(@PathVariable String startStationID,
                                  @PathVariable String  endStationID) {
        return trainInfoService.getTrainInfo(startStationID,endStationID);
    }
}
