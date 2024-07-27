package com.portfolio.dto.auth;

//DTO to send status code and message through json to the front-end
public record CustomError(Integer statusCode, String message) {
}
