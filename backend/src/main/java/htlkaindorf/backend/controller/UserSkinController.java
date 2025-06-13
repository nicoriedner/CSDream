package htlkaindorf.backend.controller;

import htlkaindorf.backend.dto.UserSkinDTO;
import htlkaindorf.backend.pojos.UserSkin;
import htlkaindorf.backend.service.UserSkinService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/userSkin")
@RequiredArgsConstructor
public class UserSkinController {
    private final UserSkinService userSkinService;

    @GetMapping("/allByUserId/{userId}")
    public ResponseEntity<List<UserSkinDTO>> getByUserId(@PathVariable Integer userId) {
        return ResponseEntity.ok(userSkinService.getAllByUser(userId));
    }

    @PostMapping("/freebie")
    public ResponseEntity<Boolean> saveFreebie(@RequestBody UserSkinDTO userSkinDTO) {
        return ResponseEntity.ok(userSkinService.saveUserSkin(userSkinDTO));
    }

    @GetMapping("/available")
    public ResponseEntity<List<UserSkinDTO>> getAvailableSkins() {
        return ResponseEntity.ok(userSkinService.getAllAvailableSkins());
    }

    @PostMapping("/add/{userId}")
    public ResponseEntity<Boolean> addUserSkin(@PathVariable Integer userId,
                                               @RequestBody UserSkinDTO userSkinDTO) {
        return ResponseEntity.ok(userSkinService.addUserSkin(userId, userSkinDTO));
    }

    @DeleteMapping("/remove/{userId}/{skinId}")
    public ResponseEntity<Boolean> removeUserSkin(@PathVariable Integer userId,
                                                  @PathVariable Integer skinId) {
        return ResponseEntity.ok(userSkinService.removeUserSkin(userId, skinId));
    }
}