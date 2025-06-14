package htlkaindorf.backend.service;

import htlkaindorf.backend.dto.UserSkinDTO;
import htlkaindorf.backend.mapper.UserSkinMapper;
import htlkaindorf.backend.pojos.SkinCatalog;
import htlkaindorf.backend.pojos.User;
import htlkaindorf.backend.pojos.UserSkin;
import htlkaindorf.backend.repositories.SkinCatalogRepository;
import htlkaindorf.backend.repositories.UserRepository;
import htlkaindorf.backend.repositories.UserSkinRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserSkinService {
    private static final Logger log = LoggerFactory.getLogger(UserSkinService.class);
    private final UserSkinRepository userSkinRepository;
    private final UserSkinMapper userSkinMapper;
    private final SkinCatalogRepository skinCatalogRepository;
    private final UserRepository userRepository;

    public List<UserSkinDTO> getAllByUser(Integer userId) {
        List<UserSkin> userSkins = userSkinRepository.findAllByUserId(userId);

        for (UserSkin skin : userSkins) {
            SkinCatalog skinCatalog = skinCatalogRepository.findById(skin.getSkinCatalogId()).orElse(null);
            if (skinCatalog != null) {
                skin.setSkin(skinCatalog);
            } else {
                System.out.println("SkinCatalog für ID " + skin.getSkinCatalogId() + " nicht gefunden!");
            }
        }

        return userSkinMapper.toDtoList(userSkins);
    }

    public Boolean saveUserSkin(UserSkinDTO userSkinDTO) {
        try {
            UserSkin userSkin = userSkinMapper.toEntity(userSkinDTO);
            log.info("ID: " + userSkin.getUserReferenceId());
            userSkinRepository.save(userSkin);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public List<UserSkinDTO> getAllAvailableSkins() {
        return userSkinMapper.toDtoList(userSkinRepository.findAll());
    }

    public Boolean addUserSkin(Integer userId, UserSkinDTO userSkinDTO) {
        try {
            if (userSkinRepository.existsByUserReferenceIdAndSkinCatalogId(userId, userSkinDTO.getSkinCatalogId())) {
                return false;
            }

            userSkinDTO.setUserReferenceId(userId);
            UserSkin userSkin = userSkinMapper.toEntity(userSkinDTO);
            userSkinRepository.save(userSkin);
            return true;
        } catch (Exception e) {
            System.err.println("Error adding UserSkin: " + e.getMessage());
            return false;
        }
    }

    public Boolean removeUserSkin(Integer userId, Integer skinId) {
        try {
            Optional<UserSkin> userSkinOpt = userSkinRepository.findByUserReferenceIdAndSkinCatalogId(userId, skinId);

            if (userSkinOpt.isPresent()) {
                userSkinRepository.delete(userSkinOpt.get());
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            System.err.println("Error removing UserSkin: " + e.getMessage());
            return false;
        }
    }

    public Float sellItem(Integer userId, Integer skinId) {
        UserSkin userSkin = userSkinRepository.findByUserReferenceIdAndId(userId, skinId).orElse(null);
        if (userSkin == null) {
            throw new RuntimeException("Skin nicht gefunden oder Benutzer besitzt diesen Skin nicht");
        }

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User nicht gefunden"));

        Float skinPrice = userSkin.getPrice();
        user.setBalance(user.getBalance() + skinPrice);
        userRepository.save(user);

        userSkinRepository.delete(userSkin);

        return user.getBalance();
    }
}