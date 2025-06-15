package htlkaindorf.backend.unboxing;

import htlkaindorf.backend.pojos.SkinCatalog;
import htlkaindorf.backend.pojos.User;
import htlkaindorf.backend.pojos.UserSkin;
import htlkaindorf.backend.repositories.UserRepository;
import htlkaindorf.backend.repositories.UserSkinRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@AllArgsConstructor
public class Upgrader {

    private final UserSkinRepository userSkinRepository;
    private final UserRepository userRepository;

    public float upgradeSkin(List<Integer> userSkinIds, float chanceInPercentage, int userId) {
        float coinValue = 0f;
        Random random = new Random();
        User user = userRepository.findUserById(userId);

        List<UserSkin> userSkins = userSkinRepository.findAllById(userSkinIds);

        for (UserSkin userSkin : userSkins) {
            coinValue += userSkin.getPrice();
        }

        float calculatedOdds = random.nextFloat() * 100;

        if (calculatedOdds < chanceInPercentage) {
            float newValue = coinValue * (chanceInPercentage / 100f);

            user.setBalance(user.getBalance() + newValue);
            userRepository.save(user);
            return newValue;
        } else {
            userSkinRepository.deleteAll(userSkins);
            return 0f;
        }
    }
}