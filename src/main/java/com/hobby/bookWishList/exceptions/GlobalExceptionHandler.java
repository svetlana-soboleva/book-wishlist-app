package com.hobby.bookWishList.exceptions;
import com.hobby.bookWishList.book.model.BookDTO;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ChangeSetPersister.NotFoundException.class)
    public ResponseEntity<List<BookDTO>> handleNotFoundException(ChangeSetPersister.NotFoundException ex) {
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
    }

}
