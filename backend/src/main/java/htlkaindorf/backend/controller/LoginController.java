package htlkaindorf.backend.controller;

import htlkaindorf.backend.dto.UserDTO;
import htlkaindorf.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequiredArgsConstructor
@RequestMapping("/api/login")
public class LoginController {

    private final UserService userLoginService;

    @PostMapping
    public ResponseEntity<String> login(@RequestBody UserDTO loginDTO) {
        boolean authenticated = userLoginService.authenticate(loginDTO.getUsername(), loginDTO.getPassword());
        if (authenticated) {
            return ResponseEntity.ok("Login erfolgreich!");
        } else {
            return ResponseEntity.status(401).body("Ungültige Anmeldedaten");
        }
    }
}