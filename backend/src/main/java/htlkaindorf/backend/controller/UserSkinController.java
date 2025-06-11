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

    @GetMapping("/freebie")
    public ResponseEntity<Boolean> saveFreebie(@PathVariable UserSkin userSkin) {
        return ResponseEntity.ok(userSkinService.saveUserSkin(userSkin));
    }
}