package com.portfolio.exception;

import org.springframework.http.HttpStatus;

public class AuthUserException extends RuntimeException {

    HttpStatus status;

    public AuthUserException(String message){
        super(message);
    }

    public AuthUserException(String message, HttpStatus status){
        super(message);
        this.status=status;
    }

    public HttpStatus getStatus(){
        return this.status;
    }
}
