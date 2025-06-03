package htlkaindorf.backend.controller;

import htlkaindorf.backend.dto.UserDTO;
import htlkaindorf.backend.service.UserService;
import htlkaindorf.backend.service.UserSkinService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/api/register")
@RequiredArgsConstructor
public class RegisterController {
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<String> register(@RequestBody UserDTO userDTO) {
        try {
            userService.register(userDTO.getUsername(), userDTO.getPassword() , userDTO.getEmail(), userDTO.getBirthdate().toString(), userDTO.getGender(), userDTO.getAvatar());
            return ResponseEntity.ok("User registered successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}