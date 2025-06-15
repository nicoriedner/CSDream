package htlkaindorf.backend.controller;

import htlkaindorf.backend.dto.UpgradeRequestDTO;
import htlkaindorf.backend.pojos.UpgradeRequest;
import htlkaindorf.backend.unboxing.Upgrader;
import htlkaindorf.backend.pojos.UserSkin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/upgrader")
public class UpgraderController {

    @Autowired
    private Upgrader upgrader;

    @PostMapping("/upgradeSkin")
    public ResponseEntity<?> upgradeSkin(@RequestBody UpgradeRequestDTO request) {
        float newBalance = upgrader.upgradeSkin(request.getUserSkinIds(), request.getChanceInPercentage(), request.getUserId());
        return ResponseEntity.ok(newBalance);
    }
}