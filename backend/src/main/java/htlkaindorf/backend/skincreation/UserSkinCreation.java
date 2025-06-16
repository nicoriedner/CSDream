package htlkaindorf.backend.skincreation;

import htlkaindorf.backend.pojos.Exterior;
import htlkaindorf.backend.pojos.Rarity;
import htlkaindorf.backend.pojos.SkinCatalog;
import htlkaindorf.backend.pojos.User;
import htlkaindorf.backend.pojos.UserSkin;
import htlkaindorf.backend.repositories.UserSkinRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@AllArgsConstructor
public class UserSkinCreation {

    private static final Logger log = LoggerFactory.getLogger(UserSkinCreation.class);
    private final UserSkinRepository userSkinRepository;

    public UserSkin createNewUserSkin(Integer skinCatalogId, Float floatValue, Rarity rarity, Boolean isStattrak, Float price, Integer userId) {
        UserSkin newSkin = new UserSkin();

        User user = new User();
        user.setId(userId);

        newSkin.setSkinCatalogId(skinCatalogId);
        newSkin.setFloatValue(floatValue);
        newSkin.setExterior(calculateExterior(floatValue));
        newSkin.setRarity(rarity);
        newSkin.setStattrak(isStattrak);
        newSkin.setPrice(price);
        newSkin.setDropDate(LocalDate.now());
        newSkin.setUserReferenceId(userId);

        log.info("Creating new user skin: " + newSkin);

        return userSkinRepository.save(newSkin);
    }

    private Exterior calculateExterior(Float floatValue) {
        if (floatValue < 0.07f) return Exterior.FACTORY_NEW;
        if (floatValue < 0.15f) return Exterior.MINIMAL_WEAR;
        if (floatValue < 0.38f) return Exterior.FIELD_TESTED;
        if (floatValue < 0.45f) return Exterior.WELL_WORN;
        return Exterior.BATTLE_SCARRED;
    }
}