package com.industech.dto;

import com.industech.model.AuthUser;

public record LoginResponse(AuthUser user, String accessToken) {
}
