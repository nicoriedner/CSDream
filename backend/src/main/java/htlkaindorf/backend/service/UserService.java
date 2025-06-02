package htlkaindorf.backend.service;

import htlkaindorf.backend.pojos.User;
import htlkaindorf.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public boolean authenticate(String username, String rawPassword) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return false;
        }
        return encoder.matches(rawPassword, user.getPassword());
    }

    public User register(String username, String password, String email, String birthday, String gender, String avatar) {
        if (userRepository.findByUsername(username) == null) {
            User user = new User();
            user.setUsername(username);
            user.setPassword(encoder.encode(password));
            user.setEmail(email);
            user.setBirthday(LocalDate.parse(birthday));
            user.setGender(gender);
            user.setAvatar(avatar);
            return userRepository.save(user);
        }
        throw new RuntimeException("Username already taken");
    }
}