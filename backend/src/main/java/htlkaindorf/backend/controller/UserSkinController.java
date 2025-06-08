package htlkaindorf.backend.controller;

import htlkaindorf.backend.dto.UserSkinDTO;
import htlkaindorf.backend.service.UserSkinService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/userskin")
@RequiredArgsConstructor
public class UserSkinController {
    private final UserSkinService userSkinService;

    @GetMapping("/allByUserId/{userId}")
    public List<UserSkinDTO> getByUserId(@PathVariable Long userId) {
        return userSkinService.getAllByUser(userId);
    }
}