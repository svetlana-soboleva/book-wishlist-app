package com.hobby.bookWishList.book;
import com.hobby.bookWishList.book.model.Book;
import com.hobby.bookWishList.book.model.GoogleBookItem;
import com.hobby.bookWishList.book.model.GoogleBooksResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/{id}/search-books")
    public ResponseEntity<List<GoogleBookItem>> searchBooks(@PathVariable String id, @RequestParam String q,
                                                            @RequestParam(defaultValue = "0") int startIndex,
                                                            @RequestParam(defaultValue = "10") int maxResults) {
        GoogleBooksResponse response = bookService.searchBooks(q, startIndex, maxResults);
        List<GoogleBookItem> books = response.getItems();
        return ResponseEntity.ok().body(books);
    }

    @PostMapping("/{userId}/like-book/{bookId}")
    public ResponseEntity<Book> likeBook(@PathVariable Long userId, @PathVariable String bookId) {
        Book likedBook = bookService.addBookToWishlist(userId, bookId);
        return ResponseEntity.ok(likedBook);
    }
}
