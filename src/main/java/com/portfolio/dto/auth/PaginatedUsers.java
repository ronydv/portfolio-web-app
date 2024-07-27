package com.portfolio.dto.auth;

import com.portfolio.model.auth.AuthUser;

import java.util.List;

public record PaginatedUsers(List<AuthUser> users, Long total) {
}
