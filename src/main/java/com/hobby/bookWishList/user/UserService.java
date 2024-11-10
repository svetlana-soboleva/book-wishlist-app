package com.hobby.bookWishList.user;

import com.hobby.bookWishList.book.BookRepository;
import com.hobby.bookWishList.book.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private BookRepository bookRepo;

    public User createUser(UserDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.username());
        user.setEmail(userDTO.email());

        return userRepo.save(user);
    }

    public User save(User user) {
        return userRepo.save(user);
    }

    public User findUserByEmail(String email) {
        return userRepo.findByEmail(email).orElse(null);
    }

    public User getUserById(Long id) {
        return userRepo.findById(id).orElseThrow();
    }

    public List<User> findAll() {
        return userRepo.findAll();
    }

}
