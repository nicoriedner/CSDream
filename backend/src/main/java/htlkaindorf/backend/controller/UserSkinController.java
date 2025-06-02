package htlkaindorf.backend.controller;

import htlkaindorf.backend.dto.SkinCatalogDTO;
import htlkaindorf.backend.dto.UserSkinDTO;
import htlkaindorf.backend.service.SkinCatalogService;
import htlkaindorf.backend.service.UserSkinService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/userskin")
@RequiredArgsConstructor
public class UserSkinController {
    private final UserSkinService userSkinService;

    @GetMapping
    public ResponseEntity<Iterable<UserSkinDTO>> getUserSkin() {
        return ResponseEntity.ok(userSkinService.findAllUserSkins());
    }
}
