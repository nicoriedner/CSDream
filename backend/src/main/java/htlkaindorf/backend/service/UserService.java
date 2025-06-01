package htlkaindorf.backend.service;

import htlkaindorf.backend.pojos.User;
import htlkaindorf.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public boolean authenticate(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user == null)
            return false;
        return user.getPassword().equals(password);
    }

    public User register(String username, String password) {
        if(userRepository.findByUsername(username) == null) {
            User user = new User(userRepository.findAll().size()+1,username,password);
            return userRepository.save(user);
        }
        throw new RuntimeException("Username already taken");
    }
}