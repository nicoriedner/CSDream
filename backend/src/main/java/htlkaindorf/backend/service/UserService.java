package htlkaindorf.backend.service;

import htlkaindorf.backend.pojos.User;
import htlkaindorf.backend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public boolean authenticate(String username, String password) {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            return false;
        }
        return password.equals(user.getPassword());
    }

    public User register(String username, String password, String email, String birthdate, String avatar) {
        if (userRepository.findUserByUsername(username) != null) {
            throw new RuntimeException("Name bereits vorhanden");
        }

        if (userRepository.findUserByEmail(email) != null) {
            throw new RuntimeException("Email bereits vorhanden");
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        LocalDate parsedDate;
        try {
            parsedDate = LocalDate.parse(birthdate, formatter);
        } catch (DateTimeParseException e) {
            throw new RuntimeException("Ungültiges Datumsformat. Bitte verwende dd.MM.yyyy, z.B. 12.08.2012.");
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);
        user.setBirthdate(parsedDate);
        user.setAvatar(avatar);

        return userRepository.save(user);
    }
}