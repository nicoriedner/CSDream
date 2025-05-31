package org.example.backend.SkinCreation;

import org.example.backend.pojos.Exterior;
import org.example.backend.pojos.Rarity;
import org.example.backend.pojos.SkinCatalog;
import org.example.backend.pojos.UserSkin;
import org.example.backend.repositories.SkinCatalogRepository;

import java.time.LocalDate;

//skin_id,float_value,exterior,rarity,is_stattrak,price,drop_date,user_id
public class UserSkinCreation {

    SkinCatalogRepository skinCatalogRepository;

    public UserSkin createNewUserSkin(SkinCatalog skin, Float floatValue, Rarity rarity, Boolean isStattrak, Float price, LocalDate dropDate, Long userId) {
        UserSkin newSkin = new UserSkin();
        newSkin.setUserId(userId);
        newSkin.setSkin(skin);
        newSkin.setFloatValue(floatValue);
        newSkin.setExterior(calculateExterior(floatValue));
        newSkin.setRarity(rarity);
        newSkin.setIsStattrak(isStattrak);
        newSkin.setPrice(price);
        newSkin.setDropDate(dropDate);
        newSkin.setUserId(userId);
        return newSkin;
    }

    private Exterior calculateExterior(Float floatValue) {
        Exterior exterior;
        if (floatValue < 0.07) {
            exterior = Exterior.FactoryNew;
        } else if (floatValue < 0.15) {
            exterior = Exterior.MinimalWear;
        } else if (floatValue < 0.38) {
            exterior = Exterior.FieldTested;
        } else if (floatValue < 0.45) {
            exterior = Exterior.WellWorn;
        } else exterior = Exterior.BattleScarred;
        return exterior;
    }
}