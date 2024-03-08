package com.industech.dto;

import com.industech.model.auth.AuthUser;

public record LoginResponse(AuthUser user, Token token) {
}
