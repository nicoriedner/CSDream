package htlkaindorf.backend.service;

import htlkaindorf.backend.dto.UserSkinDTO;
import htlkaindorf.backend.mapper.UserSkinMapper;
import htlkaindorf.backend.repositories.UserSkinRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserSkinService {
    private final UserSkinRepository userSkinRepository;
    private final UserSkinMapper userSkinMapper;

    public List<UserSkinDTO> getAllByUser(Integer userId) {
        return userSkinMapper.toDtoList(userSkinRepository.findAllByUserId(userId));
    }
}