package htlkaindorf.backend.init;

import htlkaindorf.backend.pojos.Case;
import htlkaindorf.backend.pojos.Rarity;
import htlkaindorf.backend.pojos.SkinCatalog;
import htlkaindorf.backend.pojos.UserSkin;
import htlkaindorf.backend.repositories.CaseRepository;
import htlkaindorf.backend.repositories.SkinCatalogRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.SecondaryRow;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CaseCreator {
    private final SkinCatalogRepository skinCatalogRepository;
    private final CaseRepository caseRepository;

    @PostConstruct
    public void createCases() {
        List<Rarity> allowedRarities = Arrays.stream(Rarity.values())
                .filter(r -> r != Rarity.CONTRABAND)
                .collect(Collectors.toList());

        Case freeCase = new Case();
        freeCase.setName("Free Case");
        freeCase.setPossibleSkins(getRandomSkins(allowedRarities));
        freeCase.setPrice(0l);
        caseRepository.save(freeCase);

        Case contrabandCase = new Case();
        contrabandCase.setName("Contraband Case");
        contrabandCase.setPossibleSkins(getRandomSkins(List.of(Rarity.values())));
        contrabandCase.setPrice(50l);
        caseRepository.save(contrabandCase);

        Case akCase= new Case();
        akCase.setName("Ak-47 Case");
        akCase.setPossibleSkins(getRandomSkinsByWeapon(List.of(Rarity.values()), "AK-47"));
        akCase.setPrice(20l);
        caseRepository.save(akCase);
    }

    public List<SkinCatalog> getRandomSkins(List<Rarity> rarities) {
        List<SkinCatalog> allSkins = skinCatalogRepository.findAll();
        Set<SkinCatalog> selectedSkins = new HashSet<>();
        Random random = new Random();

        // pro Rarity gibt es bis zu 10 Skins
        for (Rarity r : rarities) {
            List<SkinCatalog> skinsOfCurrentRarity = allSkins.stream()
                    .filter(s -> s.getRarity() != null && s.getRarity().equals(r))
                    .collect(Collectors.toList());
            // Math.min nimmt den kleineren der beiden Werte, falls es pro Rarity keine 10 geben würde
            int skinsToAddCount = Math.min(10, skinsOfCurrentRarity.size());

            int addedCount = 0;
            while (addedCount < 10 && skinsOfCurrentRarity.size() > 0) {
                int randomIndex = random.nextInt(skinsOfCurrentRarity.size());
                SkinCatalog chosenSkin = skinsOfCurrentRarity.get(randomIndex);

                if (selectedSkins.add(chosenSkin)) {
                    addedCount++;
                }

            }
        }
        return new ArrayList<>(selectedSkins);
    }

    public List<SkinCatalog> getRandomSkinsByWeapon(List<Rarity> rarities, String weaponName) {
        List<SkinCatalog> allSkins = skinCatalogRepository.findAll().stream().filter(s -> s.getName().contains(weaponName)).toList();
        Set<SkinCatalog> selectedSkins = new HashSet<>();
        Random random = new Random();

        // pro Rarity gibt es bis zu 10 Skins
        for (Rarity r : rarities) {
            List<SkinCatalog> skinsOfCurrentRarity = allSkins.stream()
                    .filter(s -> s.getRarity() != null && s.getRarity().equals(r))
                    .collect(Collectors.toList());
            // Math.min nimmt den kleineren der beiden Werte, falls es pro Rarity keine 10 geben würde
            int skinsToAddCount = Math.min(10, skinsOfCurrentRarity.size());

            int addedCount = 0;
            while (addedCount < 10 && skinsOfCurrentRarity.size() > 0) {
                int randomIndex = random.nextInt(skinsOfCurrentRarity.size());
                SkinCatalog chosenSkin = skinsOfCurrentRarity.get(randomIndex);

                if (selectedSkins.add(chosenSkin)) {
                    addedCount++;
                }

            }
        }
        return new ArrayList<>(selectedSkins);
    }
}