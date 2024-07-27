package com.portfolio.dto.product;

import com.portfolio.model.product.Product;

import java.util.List;

public record ProductsBySector(List<Product> products, long total) {
}
