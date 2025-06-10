package htlkaindorf.backend.skincreation;

import htlkaindorf.backend.pojos.Exterior;
import htlkaindorf.backend.pojos.Rarity;
import htlkaindorf.backend.pojos.SkinCatalog;
import htlkaindorf.backend.pojos.User;
import htlkaindorf.backend.pojos.UserSkin;
import htlkaindorf.backend.repositories.UserSkinRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class UserSkinCreation {

    private final UserSkinRepository userSkinRepository;

    public UserSkinCreation(UserSkinRepository userSkinRepository) {
        this.userSkinRepository = userSkinRepository;
    }

    public UserSkin createNewUserSkin(SkinCatalog skin, Float floatValue, Rarity rarity, Boolean isStattrak, Float price, Integer userId) {
        UserSkin newSkin = new UserSkin();

        User user = new User();
        user.setId(userId);

        newSkin.setUser(user);
        newSkin.setSkin(skin);
        newSkin.setFloatValue(floatValue);
        newSkin.setExterior(calculateExterior(floatValue));
        newSkin.setRarity(rarity);
        newSkin.setStattrak(isStattrak);
        newSkin.setPrice(price);
        newSkin.setDropDate(LocalDate.now());

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