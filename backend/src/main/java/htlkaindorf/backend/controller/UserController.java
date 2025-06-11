package htlkaindorf.backend.controller;

import htlkaindorf.backend.dto.UserDTO;
import htlkaindorf.backend.dto.UserSkinDTO;
import htlkaindorf.backend.service.UserService;
import htlkaindorf.backend.service.UserSkinService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
        try {
            Float balance = userService.getUserBalance(userId);
            return ResponseEntity.ok(balance);
        } catch (RuntimeException e) {
            // Log the error for debugging
            System.err.println("Error getting balance for user " + userId + ": " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(0.0f);
        } catch (Exception e) {
            // Handle any other unexpected errors
            System.err.println("Unexpected error getting balance for user " + userId + ": " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(0.0f);
        }
    }
}