package com.industech.dto.product;

import com.industech.model.product.Product;

import java.util.List;

public record ProductsBySector(List<Product> products, long total) {
}
