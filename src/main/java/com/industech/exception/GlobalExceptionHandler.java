package com.industech.exception;

import com.industech.dto.auth.CustomError;
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
                e.getStatus().value(),
                e.getMessage()
        );
        return new ResponseEntity<>(error,e.getStatus());
    }

    @ExceptionHandler(TokenException.class)
    public ResponseEntity<CustomError> tokenException(TokenException e){
        CustomError error=new CustomError(
                e.getStatus().value(),
                e.getMessage()
        );
        return new ResponseEntity<>(error,e.getStatus());
    }

    @ExceptionHandler(ProductException.class)
    public ResponseEntity<CustomError> productException(ProductException e){
        CustomError error=new CustomError(
                e.getStatus().value(),
                e.getMessage()
        );
        return new ResponseEntity<>(error,e.getStatus());
    }
}
