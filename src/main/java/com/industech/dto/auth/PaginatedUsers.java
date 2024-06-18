package com.industech.dto.auth;

import com.industech.model.auth.AuthUser;

import java.util.List;

public record PaginatedUsers(List<AuthUser> users, Long total) {
}
