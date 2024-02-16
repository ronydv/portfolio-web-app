package com.industech.exception;

import com.industech.dto.CustomError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

//configuration to send exception responses to the client
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(AuthUserException.class)
    public ResponseEntity<CustomError> authUserException(AuthUserException e){
        CustomError error=new CustomError(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                e.getMessage()
        );
        return new ResponseEntity<>(error,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(TokenException.class)
    public ResponseEntity<CustomError> tokenException(TokenException e){
        CustomError error=new CustomError(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                e.getMessage()
        );
        return new ResponseEntity<>(error,HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
