package com.industech.exception;

import org.springframework.http.HttpStatus;

public class ProductException extends RuntimeException{

    HttpStatus status;

    public ProductException(String message){
        super(message);
    }

    public ProductException(String message, HttpStatus status){
        super(message);
        this.status=status;
    }

    public HttpStatus getStatus(){
        return this.status;
    }
}
