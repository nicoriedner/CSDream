package htlkaindorf.backend.service;

import htlkaindorf.backend.dto.UserSkinDTO;
import htlkaindorf.backend.mapper.UserSkinMapper;
import htlkaindorf.backend.pojos.UserSkin;
import htlkaindorf.backend.repositories.UserSkinRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserSkinService {

    public final UserSkinRepository userSkinRepository;
    public final UserSkinMapper userSkinMapper;

    public List<UserSkinDTO> findAllUserSkins() {
        List<UserSkin> userSkins = userSkinRepository.findAll();

        return userSkins.stream()
                .map(userSkinMapper::toDTO)
                .collect(Collectors.toList());
    }
}
