package htlkaindorf.backend.unboxing;

import htlkaindorf.backend.pojos.SkinCatalog;
import htlkaindorf.backend.pojos.User;
import htlkaindorf.backend.pojos.UserSkin;
import htlkaindorf.backend.repositories.UserRepository;
import htlkaindorf.backend.repositories.UserSkinRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
@AllArgsConstructor
public class Upgrader {

    private final UserSkinRepository userSkinRepository;
    private final UserRepository userRepository;

    public float upgradeSkin(List<UserSkin> userSkins, float chanceInPercentage, int userId) {
        float coinValue = 0f;
        Random random = new Random();
        User user = userRepository.findUserById(userId);

        for (UserSkin userSkin : userSkins) {
            coinValue += userSkin.getPrice();
        }

        float calculatedOdds = random.nextFloat() * 100;

        if (calculatedOdds < chanceInPercentage) {
            float wonAmount = coinValue * (chanceInPercentage / 100f);
            coinValue += wonAmount;
            user.setBalance(user.getBalance() + wonAmount);
            userRepository.save(user);
        } else {
            coinValue = 0f;
            userSkinRepository.deleteAll(userSkins);
        }

        return coinValue;
    }
}
