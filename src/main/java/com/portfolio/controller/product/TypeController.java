package com.portfolio.controller.product;

import com.portfolio.dto.product.TypeDetails;
import com.portfolio.service.product.TypeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/v1/product-management")
public class TypeController {

    private final TypeService typeService;
    public TypeController(TypeService typeService) {this.typeService = typeService;}

    @GetMapping("/types/{sector}")
    public ResponseEntity<List<TypeDetails>> getTypesBySector(@PathVariable("sector")String sector){
        return new ResponseEntity<>(typeService.getTypesBySector(sector), OK);
    }

    @GetMapping("/types")
    @PreAuthorize("hasRole('admin:read')")
    public ResponseEntity<List<TypeDetails>> getAllTypes(){
        return new ResponseEntity<>(typeService.getProductTypes(), OK);
    }

    @DeleteMapping("/types/{id}")
    @PreAuthorize("hasRole('admin:delete')")
    public ResponseEntity<String> deleteType(@PathVariable("id") Integer id){
        return new ResponseEntity<>(typeService.deleteType(id),OK);
    }
}
