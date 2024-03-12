package com.industech.dto.auth;

import com.industech.model.auth.AuthUser;

public record LoginResponse(AuthUser user, Token token) {
}
