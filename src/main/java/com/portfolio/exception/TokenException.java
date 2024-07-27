package com.portfolio.exception;

import org.springframework.http.HttpStatus;

public class TokenException extends RuntimeException {

    HttpStatus status;

    public TokenException(String message){
        super(message);
    }

    public TokenException(String message, HttpStatus status){
        super(message);
        this.status=status;
    }

    public HttpStatus getStatus(){
        return this.status;
    }

}
