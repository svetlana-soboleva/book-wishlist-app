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
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/search-books")
    public ResponseEntity<List<GoogleBookItem>> searchBooks( @RequestParam String q,
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

 /*   @GetMapping("/books/searchNewestBooks")
    public GoogleBooksResponse searchBooks(
            @RequestParam int page,
            @RequestParam(defaultValue = "10") int maxResults) {
        return bookService.searchNewestBooks( page, maxResults);
    }*/

    @GetMapping("/bookInfo/{id}")
    public ResponseEntity<GoogleBookItem> searchBookInfo(@PathVariable String id) {
        GoogleBookItem response = bookService.searchBookInfo(id);
        return ResponseEntity.ok().body(response);
    }
}
