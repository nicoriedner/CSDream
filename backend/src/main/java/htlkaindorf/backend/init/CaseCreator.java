package htlkaindorf.backend.init;

import htlkaindorf.backend.pojos.Case;
import htlkaindorf.backend.pojos.Rarity;
import htlkaindorf.backend.pojos.SkinCatalog;
import htlkaindorf.backend.repositories.CaseRepository;
import htlkaindorf.backend.repositories.SkinCatalogRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.SecondaryRow;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
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
        caseRepository.save(freeCase);

        Case contrabandCase = new Case();
        contrabandCase.setName("Contraband Case");
        contrabandCase.setPossibleSkins(getRandomSkins(List.of(Rarity.values())));
        caseRepository.save(contrabandCase);
    }

    public List<SkinCatalog> getRandomSkins(List<Rarity> rarities) {
        List<SkinCatalog> allSkins = skinCatalogRepository.findAll();
        List<SkinCatalog> selectedSkins = new ArrayList<>();
        Random random = new Random();

        for (Rarity r : rarities) {
            List<SkinCatalog> skinsOfCurrentRarity = allSkins.stream()
                    .filter(s -> s.getRarity().equals(r))
                    .collect(Collectors.toList());

            int skinsToAddCount = Math.min(10, skinsOfCurrentRarity.size());

            for (int i = 0; i < skinsToAddCount; i++) {
                int randomIndex = random.nextInt(skinsOfCurrentRarity.size());
                selectedSkins.add(skinsOfCurrentRarity.get(randomIndex));
            }
        }
        return selectedSkins;
    }
}
