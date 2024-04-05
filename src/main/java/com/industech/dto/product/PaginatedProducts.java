package com.industech.dto.product;

import java.util.List;

public record PaginatedProducts(List<ProductDetails> products, Integer totalProducts) {
}
