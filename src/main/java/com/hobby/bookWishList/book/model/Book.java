package com.hobby.bookWishList.book.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hobby.bookWishList.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bookId;

    @ManyToMany(mappedBy = "likedBooks")
    @JsonBackReference
    private List<User> usersLiked = new ArrayList<>();

    public Book() {
    }

    public Book(String bookId) {
        this.bookId = bookId;
    }
}
