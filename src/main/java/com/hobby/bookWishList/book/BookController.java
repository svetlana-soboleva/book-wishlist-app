package com.hobby.bookWishList.book;
import com.hobby.bookWishList.book.model.Book;
import com.hobby.bookWishList.book.model.GoogleBookItem;
import com.hobby.bookWishList.book.model.GoogleBooksResponse;
import com.hobby.bookWishList.user.User;
import com.hobby.bookWishList.user.UserDTO;
import com.hobby.bookWishList.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {

    @Autowired
    private BookService bookService;
    @Autowired
    private UserService userService;

    @GetMapping("/search-books")
    public ResponseEntity<List<GoogleBookItem>> searchBooks( @RequestParam String q,
                                                            @RequestParam(defaultValue = "0") int startIndex,
                                                            @RequestParam(defaultValue = "10") int maxResults) {
        GoogleBooksResponse response = bookService.searchBooks(q, startIndex, maxResults);
        List<GoogleBookItem> books = response.getItems();
        return ResponseEntity.ok().body(books);
    }

    @PostMapping("/secure/like-book/{bookId}")
    public ResponseEntity<Book> likeBook(@RequestBody UserDTO userDTO, @PathVariable String bookId) {
        User existingUser = userService.findUserByEmail(userDTO.email());

        if(existingUser == null){
            existingUser = userService.createUser(userDTO);
        }
        //if no user create new user by ca;;ing userService.createUser(userDTO)
    //how to do it
        //otherwise
        Book book = bookService.findBookInBD(bookId);
        if(book ==null){
            book = new Book(bookId);
            bookService.saveBook(book);
        }
        existingUser.toggleWishList(book);
        userService.save(existingUser);
        return ResponseEntity.ok(book);
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
