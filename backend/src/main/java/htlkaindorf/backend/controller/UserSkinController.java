package htlkaindorf.backend.controller;

import htlkaindorf.backend.dto.UpgradeRequestDTO;
import htlkaindorf.backend.dto.UserSkinDTO;
import htlkaindorf.backend.pojos.UpgradeRequest;
import htlkaindorf.backend.service.UserSkinService;
import htlkaindorf.backend.unboxing.Upgrader;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/userSkin")
@RequiredArgsConstructor
public class UserSkinController {
    private final UserSkinService userSkinService;
    private final Upgrader upgrader;

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
    public ResponseEntity<Float> removeUserSkin(@PathVariable Integer userId,
                                                @PathVariable Integer skinId) {
        try {
            Float updatedBalance = userSkinService.sellItem(userId, skinId);
            return ResponseEntity.ok(updatedBalance);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(-1f);
        }
    }

    @PostMapping("/sell/{userId}/{skinId}")
    public ResponseEntity<Float> sellSkin(@PathVariable Integer userId, @PathVariable Integer skinId) {
        try {
            Float newBalance = userSkinService.sellItem(userId, skinId);
            return ResponseEntity.ok(newBalance); // Gib den neuen Guthabenwert zurück
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Fehlerbehandlung
        }
    }

    @PostMapping("/upgradeSkin")
    public ResponseEntity<Float> upgradeSkin(@RequestBody UpgradeRequestDTO upgradeRequest) {
        float newBalance = upgrader.upgradeSkin(upgradeRequest.getUserSkinIds(), upgradeRequest.getChanceInPercentage(), upgradeRequest.getUserId());
        return ResponseEntity.ok(newBalance);
    }
}