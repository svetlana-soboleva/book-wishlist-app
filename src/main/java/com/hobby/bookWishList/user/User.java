package com.hobby.bookWishList.user;
import com.hobby.bookWishList.book.model.Book;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_books",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "book_id")
    )
    private List<Book> likedBooks = new ArrayList<>();

    public User() {
    }

    public User(Long id, String username, String password, List<Book> likedBooks) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.likedBooks = likedBooks;
    }
}
