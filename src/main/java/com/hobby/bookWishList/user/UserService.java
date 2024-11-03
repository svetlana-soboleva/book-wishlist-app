package com.hobby.bookWishList.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User createUser(UserDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.username());

        String hashedPassword = passwordEncoder.encode(userDTO.password());
        user.setPassword(hashedPassword);

        return userRepo.save(user);
    }
    public User getUserById(Long id) {
        return userRepo.findById(id).orElseThrow();
    }

    public List<User> findAll() {
        return userRepo.findAll();
    }
}
