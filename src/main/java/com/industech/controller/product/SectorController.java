package com.industech.controller.product;

import com.industech.dto.product.SectorDetails;
import com.industech.service.product.SectorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/v1/product-management")
public class SectorController {

    private final SectorService sectorService;

    public SectorController(SectorService sectorService) { this.sectorService = sectorService;}

    @GetMapping("/sector")
    public ResponseEntity<List<SectorDetails>> getSectors(){
        return new ResponseEntity<>(sectorService.getSectors(), OK);
    }
}
