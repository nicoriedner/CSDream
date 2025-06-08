package htlkaindorf.backend.unboxing;

import htlkaindorf.backend.pojos.SkinCatalog;
import htlkaindorf.backend.pojos.UserSkin;
import htlkaindorf.backend.repositories.UserRepository;
import htlkaindorf.backend.repositories.UserSkinRepository;

import java.util.List;
import java.util.Random;

public class Upgrader {

    private UserSkinRepository userSkinRepository;
    private UserRepository userRepository;
    private SkinCatalog skinCatalog;

    public float upgradeSkin(List<UserSkin> userSkins, float chanceInPercentage) {
        float coinValue = 0f;
        Random random = new Random();

        for (UserSkin userSkin : userSkins) {
            coinValue += userSkin.getPrice();
        }

        float calculatedOdds = random.nextFloat() * 100;

        if (calculatedOdds < chanceInPercentage) {
            float bonus = coinValue * (chanceInPercentage / 100f);
            coinValue += bonus;
        } else {
            coinValue = 0f;
        }

        return coinValue;
    }
}
