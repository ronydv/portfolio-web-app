package com.portfolio.controller.product;

import com.portfolio.dto.product.SectorDetails;
import com.portfolio.service.product.SectorService;
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
