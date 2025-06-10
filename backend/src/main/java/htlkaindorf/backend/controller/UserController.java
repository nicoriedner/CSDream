package htlkaindorf.backend.controller;

import htlkaindorf.backend.dto.UserDTO;
import htlkaindorf.backend.dto.UserSkinDTO;
import htlkaindorf.backend.service.UserService;
import htlkaindorf.backend.service.UserSkinService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/balance/{userId}")
    public ResponseEntity<Float> getBalanceById(@PathVariable Integer userId) {
        return ResponseEntity.ok(userService.getUserBalance(userId));
    }
}
