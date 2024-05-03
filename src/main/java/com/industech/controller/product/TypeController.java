package com.industech.controller.product;

import com.industech.dto.product.ProductDetails;
import com.industech.dto.product.TypeDetails;
import com.industech.service.product.TypeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/v1/product-management")
public class TypeController {

    private final TypeService typeService;
    public TypeController(TypeService typeService) {this.typeService = typeService;}

    @GetMapping("/types")
    public ResponseEntity<List<TypeDetails>> getAllTypes(){
        return new ResponseEntity<>(typeService.getProductTypes(), OK);
    }

    @DeleteMapping("/types/{id}")
    public ResponseEntity<String> deleteType(@PathVariable("id") Integer id){
        return new ResponseEntity<>(typeService.deleteType(id),OK);
    }
}
