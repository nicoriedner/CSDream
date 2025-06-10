package htlkaindorf.backend.controller;

import htlkaindorf.backend.dto.UserDTO;
import htlkaindorf.backend.mapper.UserMapper;
import htlkaindorf.backend.pojos.User;
import htlkaindorf.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequiredArgsConstructor
@RequestMapping("/api/login")
public class LoginController {

    private final UserService userLoginService;
    private final UserMapper userMapper;

    @PostMapping
    public ResponseEntity<UserDTO> login(@RequestBody UserDTO loginDTO) {
        Optional<User> user = userLoginService.authenticate(loginDTO.getUsername(), loginDTO.getPassword());
        return ResponseEntity.of(user.map(userMapper::toDto));
    }
}