package com.travel.booking.domain.odsay.train;


import com.travel.booking.domain.odsay.train.DTO.ResultDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/odsay/api/train")
public class TrainInfoController {
    private final TrainInfoServiceImpl trainInfoService;

    @GetMapping("/{startStationID}/{endStationID}")
    public ResultDTO getTrainInfo(@PathVariable String startStationID,
                                  @PathVariable String  endStationID,
                                  @RequestParam Long hour,
                                  @RequestParam char dayz) {
        return trainInfoService.getFilterTrainInfo(startStationID,endStationID,hour,dayz);
    }
}
