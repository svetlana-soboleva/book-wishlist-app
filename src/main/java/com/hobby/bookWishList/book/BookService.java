package com.hobby.bookWishList.book;

import com.hobby.bookWishList.book.model.Book;
import com.hobby.bookWishList.book.model.GoogleBookItem;
import com.hobby.bookWishList.book.model.GoogleBooksResponse;
import com.hobby.bookWishList.user.User;
import com.hobby.bookWishList.user.UserRepository;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    BookRepository bookRepository;

    private final String apiKey;
    private final RestTemplate restTemplate;

    public BookService() {
        Dotenv dotenv = Dotenv.load();
        this.apiKey = dotenv.get("GOOGLE_BOOKS_API_KEY");
        this.restTemplate = new RestTemplate();
    }

    private static final String BASE_URL = "https://www.googleapis.com/books/v1/volumes";

    public GoogleBooksResponse searchBooks(String query, int startIndex, int maxResults) {
        String url = String.format("%s?q=%s&key=%s&startIndex=%d&maxResults=%d", BASE_URL, query, apiKey, startIndex, maxResults);
        return restTemplate.getForObject(url, GoogleBooksResponse.class);
    }

    public Book findBookInBD(String bookId) {
        return bookRepository.findByBookId(bookId);
    }

    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    public GoogleBookItem searchBookInfo(String id) {
        String url = String.format("%s/%s", BASE_URL, id);

        return restTemplate.getForObject(url, GoogleBookItem.class);
    }

    public List<Book> getLikedBooksByUserEmail(String email) throws ChangeSetPersister.NotFoundException {
        User user = userRepo.findByEmail(email).orElseThrow(ChangeSetPersister.NotFoundException::new);
        return user.getLikedBooks();
    }
}

