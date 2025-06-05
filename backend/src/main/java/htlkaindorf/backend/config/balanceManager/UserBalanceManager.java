package htlkaindorf.backend.config.balanceManager;

import htlkaindorf.backend.pojos.User;
import htlkaindorf.backend.pojos.UserSkin;
import htlkaindorf.backend.repositories.UserRepository;
import htlkaindorf.backend.repositories.UserSkinRepository;

import java.util.List;

public class UserBalanceManager {
    UserRepository userRepository;
    UserSkinRepository userSkinRepository;

    public Float manageUserBalance(Integer userId, Integer balanceChange) {
        User user = userRepository.findUserById(userId);
        user.setBalance(user.getBalance() + balanceChange);
        userRepository.save(user);
        Float newBalance = user.getBalance();
        return newBalance;
    }

    public Float getInventoryValue(Integer userId) {
        Float inventoryValue = 0.0f;
        User user = userRepository.findUserById(userId);
        List<UserSkin> userSkins = userSkinRepository.findAllSkinsByUser(userId);
        for (UserSkin userSkin : userSkins) {
            inventoryValue += userSkin.getPrice();
        }
        return inventoryValue;
    }

    public Float sellItem(Integer userId, UserSkin userSkin) {
        User user = userRepository.findUserById(userId);
        List<UserSkin> userSkins = userSkinRepository.findAllSkinsByUser(userId);
        Float sellValue = 0.0f;
        if(userSkins.contains(userSkin)) {
            sellValue = userSkin.getPrice();
            userSkins.remove(userSkin);
            user.setBalance(user.getBalance() + sellValue);
            userRepository.save(user);
        } else {
            throw new RuntimeException("User besitzt diesen Skin nicht");
        }
        return sellValue;
    }
}
