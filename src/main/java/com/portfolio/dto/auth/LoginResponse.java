package com.portfolio.dto.auth;

import com.portfolio.model.auth.AuthUser;

public record LoginResponse(AuthUser user, Token token) {
}
