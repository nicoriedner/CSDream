package htlkaindorf.backend.unboxing;

import htlkaindorf.backend.config.balanceManager.UserBalanceManager;
import htlkaindorf.backend.pojos.Case;
import htlkaindorf.backend.pojos.Rarity;
import htlkaindorf.backend.pojos.SkinCatalog;
import htlkaindorf.backend.repositories.SkinCatalogRepository;
import htlkaindorf.backend.repositories.UserSkinRepository;
import htlkaindorf.backend.skincreation.UserSkinCreation;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CaseUnboxing {
    private final UserSkinCreation creator;
    private UserBalanceManager balanceManager;

    //    MIL_SPEC 79,92%
    //    RESTRICTED 15,98%
    //    CLASSIFIED 3,2%
    //    COVERT 0,64%
    //    EXTRAORDINARY 0,26%

    public void unboxCase(Case caseToUnbox, Integer userId) {
        if (balanceManager.manageUserBalance(userId, caseToUnbox.getPrice() * (-1)) >= 0) {


            Random rand = new Random();
            float unboxIndex = rand.nextFloat() * 100;
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
            long statTrak = rand.nextInt(10);
            boolean isStattrak = (statTrak == 0);

            Float floatValue = getFloatValue(unboxedSkin);

            Float priceOfSkin = calculatePriceOfSkin(unboxedSkin, floatValue, isStattrak);
            Integer skinId = unboxedSkin.getId();

            creator.createNewUserSkin(skinId, floatValue, unboxedSkin.getRarity(), isStattrak, priceOfSkin, userId);
        }
    }

    public SkinCatalog getSkin(Rarity rarity, Case caseToUnbox) {
        Random rand = new Random();
        List<SkinCatalog> skinsWithThatRarity = caseToUnbox.getPossibleSkins().stream()
                .filter(s -> s.getRarity().equals(rarity))
                .collect(Collectors.toList());

        if (skinsWithThatRarity.isEmpty()) {
            skinsWithThatRarity = caseToUnbox.getPossibleSkins();
            if (skinsWithThatRarity.isEmpty()) {
                throw new RuntimeException("Keine Skins in Case verfügbar.");
            }
        }

        return skinsWithThatRarity.get(rand.nextInt(skinsWithThatRarity.size()));
    }

    public Float getFloatValue(SkinCatalog skin) {
        Random rand = new Random();
        Float minFloat = skin.getFloatMin();
        Float maxFloat = skin.getFloatMax();
        Float range = maxFloat - minFloat;
        return minFloat + rand.nextFloat() * range;
    }

    public Float calculatePriceOfSkin(SkinCatalog skinCatalog, Float floatValue, boolean isStattrak) {
            float basePrice;

            switch (skinCatalog.getRarity()) {
                case MIL_SPEC:
                    basePrice = 5f;
                    break;
                case RESTRICTED:
                    basePrice = 15f;
                    break;
                case CLASSIFIED:
                    basePrice = 40f;
                    break;
                case COVERT:
                    basePrice = 100f;
                    break;
                case EXTRAORDINARY:
                    basePrice = 300f;
                    break;
                default:
                    basePrice = 1f;
            }

            float floatMultiplier;
            if (floatValue <= 0.07) {
                floatMultiplier = 1.0f;
            } else if (floatValue <= 0.15) {
                floatMultiplier = 0.9f;
            } else if (floatValue <= 0.38) {
                floatMultiplier = 0.8f;
            } else if (floatValue <= 0.45) {
                floatMultiplier = 0.65f;
            } else {
                floatMultiplier = 0.5f;
            }

            float finalPrice = basePrice * floatMultiplier;

            if (isStattrak) {
                if (skinCatalog.getRarity() != Rarity.EXTRAORDINARY) {
                    finalPrice *= 1.10f;
                } else {
                    finalPrice *= 0.90f;
                }
            }

            return Math.round(finalPrice * 100f) / 100f;
        }
    }