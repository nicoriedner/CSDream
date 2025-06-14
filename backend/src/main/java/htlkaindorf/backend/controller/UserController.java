package htlkaindorf.backend.controller;

import htlkaindorf.backend.dto.UserDTO;
import htlkaindorf.backend.dto.UserSkinDTO;
import htlkaindorf.backend.init.SkinReader;
import htlkaindorf.backend.pojos.User;
import htlkaindorf.backend.repositories.UserRepository;
import htlkaindorf.backend.service.UserService;
import htlkaindorf.backend.service.UserSkinService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;
    private final SkinReader skinReader;

    @GetMapping("/balance/{userId}")
    public ResponseEntity<Float> getBalanceById(@PathVariable Integer userId) {
        try {
            Float balance = userService.getUserBalance(userId);
            return ResponseEntity.ok(balance);
        } catch (RuntimeException e) {
            System.err.println("Error getting balance for user " + userId + ": " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(0.0f);
        } catch (Exception e) {
            System.err.println("Unexpected error getting balance for user " + userId + ": " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(0.0f);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        try {
            List<UserDTO> users = userService.getAllUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            System.err.println("Error fetching all users: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PatchMapping("/{userId}/balanceChange")
    public ResponseEntity<Void> updateBalance(
            @PathVariable Integer userId,
            @RequestParam Float newBalance
    ) {
        try {
            userService.updateBalance(userId, newBalance);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            System.err.println("Balance update failed for user " + userId + ": " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            System.err.println("Unexpected error updating balance: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}