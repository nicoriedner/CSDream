package htlkaindorf.backend.config.balanceManager;

import htlkaindorf.backend.pojos.User;
import htlkaindorf.backend.pojos.UserSkin;
import htlkaindorf.backend.repositories.UserRepository;
import htlkaindorf.backend.repositories.UserSkinRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class UserBalanceManager {

    private final UserRepository userRepository;
    private final UserSkinRepository userSkinRepository;

    public Float manageUserBalance(Integer userId, Long balanceChange) {
        // sucht den übergebenen User
        User user = userRepository.findUserById(userId);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        // Ändert das Guthaben
        user.setBalance(user.getBalance() + balanceChange);
        userRepository.save(user);
        return user.getBalance();
    }

    // Rechnet den Wert aller Skins eines Users zusammengerechnet aus
    public Float getInventoryValue(Integer userId) {
        Float inventoryValue = 0.0f;
        List<UserSkin> userSkins = userSkinRepository.findAllByUserId(userId);
        for (UserSkin userSkin : userSkins) {
            inventoryValue += userSkin.getPrice();
        }
        return inventoryValue;
    }

    // Verkauft einen Skin von einem User mit der übergebenen UserId
    public Float sellItem(Integer userId, UserSkin userSkin) {
        User user = userRepository.findUserById(userId);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        List<UserSkin> userSkins = userSkinRepository.findAllByUserId(userId);
        if (!userSkins.contains(userSkin)) {
            throw new RuntimeException("User besitzt diesen Skin nicht");
        }

        Float sellValue = userSkin.getPrice();
        userSkinRepository.delete(userSkin);
        user.setBalance(user.getBalance() + sellValue);
        userRepository.save(user);

        return sellValue;
    }
}