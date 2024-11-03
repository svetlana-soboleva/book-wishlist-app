package com.hobby.bookWishList.book.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bookId;

    public Book() {
    }

    public Book(String bookId) {
        this.bookId = bookId;
    }
}
