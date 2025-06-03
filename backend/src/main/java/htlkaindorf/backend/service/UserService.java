package htlkaindorf.backend.service;

import htlkaindorf.backend.pojos.User;
import htlkaindorf.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public boolean authenticate(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return false;
        }
        return password.equals(user.getPassword());
    }

    public User register(String username, String password, String email, String birthdate, String gender, String avatar) {
        if (userRepository.findByUsername(username) != null) {
            throw new RuntimeException("Name bereits vorhanden");
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate parsedDate;
        try {
            parsedDate = LocalDate.parse(birthdate, formatter);
        } catch (DateTimeParseException e) {
            throw new RuntimeException("Ungültiges Datumsformat. Bitte verwende yyyy-MM-dd, z.B. 2012-08-12.");
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);
        user.setBirthdate(parsedDate);
        user.setGender(gender);
        user.setAvatar(avatar);

        return userRepository.save(user);
    }
}