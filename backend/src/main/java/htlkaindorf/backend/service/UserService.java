package htlkaindorf.backend.service;

import htlkaindorf.backend.dto.UserDTO;
import htlkaindorf.backend.mapper.UserMapper;
import htlkaindorf.backend.pojos.User;
import htlkaindorf.backend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public Optional<User> authenticate(String username, String password) {
        User user = userRepository.findUserByUsername(username);
        if (user == null || !password.equals(user.getPassword())) {
            return Optional.empty();
        }
        return Optional.of(user);
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
        user.setBalance(100f);

        return userRepository.save(user);
    }

    public Float getUserBalance(Integer userId) {
        User user = userRepository.findUserById(userId);
        if (user == null) {
            throw new RuntimeException("User not found with ID: " + userId);
        }
        return user.getBalance();
    }

    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(userMapper::toDto)
                .toList();
    }

    public void updateBalance(Integer userId, Float newBalance) {
        User user = userRepository.findUserById(userId);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        user.setBalance(newBalance);
        userRepository.save(user);
    }
}