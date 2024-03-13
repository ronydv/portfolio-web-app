package com.industech.dto.product;

/*
this DTO is created specifically to avoid this exception:
** Response already committed. Ignoring:HttpMessageNotWritableException:
** Could not write JSON: Infinite recursion (StackOverflowError)
when fetching it in ProductService -> getProduct()
*/
public record CategoryDetails(Integer id, String name) {}
