package htlkaindorf.backend.skincreation;

import htlkaindorf.backend.pojos.Exterior;
import htlkaindorf.backend.pojos.Rarity;
import htlkaindorf.backend.pojos.SkinCatalog;
import htlkaindorf.backend.pojos.UserSkin;
import htlkaindorf.backend.repositories.SkinCatalogRepository;
import htlkaindorf.backend.repositories.UserSkinRepository;

import java.time.LocalDate;

//skin_id,float_value,exterior,rarity,is_stattrak,price,drop_date,user_id
public class UserSkinCreation {

    private UserSkinRepository userSkinRepository;

    public UserSkin createNewUserSkin(SkinCatalog skin, Float floatValue, Rarity rarity, Boolean isStattrak, Float price, Long userId) {
        UserSkin newSkin = new UserSkin();
        newSkin.setUserId(userId);
        newSkin.setSkin(skin);
        newSkin.setFloatValue(floatValue);
        newSkin.setExterior(calculateExterior(floatValue));
        newSkin.setRarity(rarity);
        newSkin.setIsStattrak(isStattrak);
        newSkin.setPrice(price);
        newSkin.setDropDate(LocalDate.now());
        newSkin.setUserId(userId);
        userSkinRepository.save(newSkin);
        return newSkin;
    }

    private Exterior calculateExterior(Float floatValue) {
        Exterior exterior;
        if (floatValue < 0.07) {
            exterior = Exterior.FACTORY_NEW;
        } else if (floatValue < 0.15) {
        exterior = Exterior.MINIMAL_WEAR;
        } else if (floatValue < 0.38) {
            exterior = Exterior.FIELD_TESTED;
        } else if (floatValue < 0.45) {
            exterior = Exterior.WELL_WORN;
        } else exterior = Exterior.BATTLE_SCARRED;
        return exterior;
    }
}