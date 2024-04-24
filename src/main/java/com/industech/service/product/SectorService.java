package com.industech.service.product;

import com.industech.dto.product.SectorDetails;
import com.industech.exception.ProductException;
import com.industech.model.product.Sector;
import com.industech.repository.product.SectorRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class SectorService {
    @Autowired
    private SectorRepository sectorRepository;

    protected Sector getSector(String sector){
        return sectorRepository.findSectorByName(sector)
                .orElseGet( () ->{
                    log.info("\u001B[33mSector: \u001B[35m'"+sector+"'\u001B[0m not found\u001B[0m");
                    return null;
                });
    }

    public List<SectorDetails> getSectors() {
        List<Sector> sectors = sectorRepository.findAll();
        if (sectors.isEmpty()) {
            log.error("No sectors found -> getSectors()");
            throw new ProductException("No sectors found", HttpStatus.NOT_FOUND);
        } else {
            return sectors.stream()
                    .map(sector -> new SectorDetails(sector.getName()))
                    .collect(Collectors.toList());
        }
    }
}
