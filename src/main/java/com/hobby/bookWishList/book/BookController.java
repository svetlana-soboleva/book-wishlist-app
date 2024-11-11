package com.hobby.bookWishList.book;

import com.hobby.bookWishList.book.model.Book;
import com.hobby.bookWishList.book.model.BookDTO;
import com.hobby.bookWishList.book.model.GoogleBookItem;
import com.hobby.bookWishList.book.model.GoogleBooksResponse;
import com.hobby.bookWishList.user.model.User;
import com.hobby.bookWishList.user.model.UserDTO;
import com.hobby.bookWishList.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {

    @Autowired
    private BookService bookService;
    @Autowired
    private UserService userService;

    @GetMapping("/search-books")
    public ResponseEntity<List<GoogleBookItem>> searchBooks(@RequestParam String q, @RequestParam(defaultValue = "0") int startIndex, @RequestParam(defaultValue = "10") int maxResults) {
        GoogleBooksResponse response = bookService.searchBooks(q, startIndex, maxResults);
        List<GoogleBookItem> books = response.getItems();
        return ResponseEntity.ok().body(books);
    }


    @PostMapping("/secure/like-book/{bookId}")
    public ResponseEntity<?> likeBook(@RequestBody UserDTO userDTO, @PathVariable String bookId) {
        try {
            User existingUser = userService.findUserByEmail(userDTO.email());
            if (existingUser == null) {
                existingUser = userService.createUser(userDTO);
            }

            Book book = bookService.findBookInBD(bookId);
            if (book == null) {
                book = new Book(bookId);
                bookService.saveBook(book);
            }

            existingUser.toggleWishList(book);
            userService.save(existingUser);

            return ResponseEntity.ok().body(book);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

    @GetMapping("/bookInfo/{id}")
    public ResponseEntity<GoogleBookItem> searchBookInfo(@PathVariable String id) {
        GoogleBookItem response = bookService.searchBookInfo(id);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/secure/liked")
    public List<BookDTO> getLikedBooksByUserEmail(@RequestParam String email) throws ChangeSetPersister.NotFoundException {
        List<Book> books = bookService.getLikedBooksByUserEmail(email);
        return books.stream()
                .map(book -> new BookDTO(book.getBookId()))
                .collect(Collectors.toList());
    }
}
