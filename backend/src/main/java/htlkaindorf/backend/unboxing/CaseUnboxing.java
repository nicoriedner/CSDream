package htlkaindorf.backend.unboxing;

import htlkaindorf.backend.pojos.Case;
import htlkaindorf.backend.pojos.Rarity;
import htlkaindorf.backend.pojos.SkinCatalog;
import htlkaindorf.backend.repositories.SkinCatalogRepository;
import htlkaindorf.backend.repositories.UserSkinRepository;
import htlkaindorf.backend.skincreation.UserSkinCreation;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

public class CaseUnboxing {
    UserSkinRepository userSkinRepository;
    SkinCatalogRepository skinCatalogRepository;
    UserSkinCreation creator;

    //    MIL_SPEC 79,92%
    //    RESTRICTED 15,98%
    //    CLASSIFIED 3,2%
    //    COVERT 0,64%
    //    EXTRAORDINARY 0,26%

    //79,97 Milspec 15,98 restricted 3,2 classified 0,64 covert 0,26 gold
    public void unboxCase(Case caseToUnbox, Long userId) {
        Random rand = new Random();
        long unboxIndex = Math.abs(rand.nextLong() % 101);
        Rarity unboxedRarity;
        if (unboxIndex <= 79.92) {
            unboxedRarity = Rarity.MIL_SPEC;
        } else if (unboxIndex <= 95.9) {
            unboxedRarity = Rarity.RESTRICTED;
        } else if (unboxIndex <= 99.1) {
            unboxedRarity = Rarity.CLASSIFIED;
        } else if (unboxIndex <= 99.74) {
            unboxedRarity = Rarity.COVERT;
        } else unboxedRarity = Rarity.EXTRAORDINARY;

        SkinCatalog unboxedSkin = getSkin(unboxedRarity, caseToUnbox);
        if (unboxedRarity != Rarity.EXTRAORDINARY) {
            boolean isStattrak = rand.nextBoolean();
        }
        boolean isStattrak = false;

        Float floatValue = getFloatValue(unboxedSkin);

        Float priceOfSkin = calculatePriceOfSkin(unboxedSkin, floatValue);

        creator.createNewUserSkin(unboxedSkin, floatValue, unboxedSkin.getRarity(), isStattrak, priceOfSkin, userId);
    }

    public SkinCatalog getSkin(Rarity rarity, Case caseToUnbox) {
        Random rand = new Random();
        List<SkinCatalog> skinsWithThatRarity = caseToUnbox.getPossibleSkins().stream().filter(s -> s.getRarity().equals(rarity)).collect(Collectors.toList());
        return skinsWithThatRarity.get(rand.nextInt(skinsWithThatRarity.size()));
    }

    public Float getFloatValue(SkinCatalog skin) {
        Random rand = new Random();
        Float minFloat = skin.getFloatMin();
        Float maxFloat = skin.getFloatMax();
        Float range = maxFloat - minFloat;
        return minFloat + rand.nextFloat() * range;
    }

    public Float calculatePriceOfSkin(SkinCatalog skinCatalog, Float floatValue) {
        Float calculatedPrice = 0f;

        return calculatedPrice;
    }
}