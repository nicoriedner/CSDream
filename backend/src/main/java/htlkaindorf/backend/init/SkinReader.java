package htlkaindorf.backend.init;

import htlkaindorf.backend.pojos.Exterior;
import htlkaindorf.backend.pojos.Rarity;
import htlkaindorf.backend.pojos.SkinCatalog;
import htlkaindorf.backend.pojos.User;
import htlkaindorf.backend.pojos.UserSkin;
import htlkaindorf.backend.repositories.SkinCatalogRepository;
import htlkaindorf.backend.repositories.UserRepository;
import htlkaindorf.backend.repositories.UserSkinRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class SkinReader {

    private static final Logger log = LoggerFactory.getLogger(SkinReader.class);
    private final UserSkinRepository userSkinRepository;
    private final SkinCatalogRepository skinCatalogRepository;
    private final UserRepository userRepository;

    @PostConstruct
    public void readSkins() {
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream("csv/userSkin.csv");
        if (inputStream == null) {
            throw new RuntimeException("CSV-Datei konnte nicht geladen werden.");
        }

        List<String> lines = new BufferedReader(new InputStreamReader(inputStream))
                .lines()
                .skip(1) // Header überspringen
                .toList();

        for (String line : lines) {
            try {
                String[] parts = line.split(",");
                int skinId = Integer.parseInt(parts[0]);
                float floatValue = parts[1].equals("None - None") ? 0f : Float.parseFloat(parts[1]);
                Exterior exterior = Exterior.valueOf(parts[2]);
                Rarity rarity = Rarity.valueOf(parts[3].replace("-", "_").toUpperCase());
                boolean stattrak = Boolean.parseBoolean(parts[4]);
                float price = Float.parseFloat(parts[5]);
                LocalDate dropDate = LocalDate.parse(parts[6]);
                Long userId = Long.parseLong(parts[7]);

                SkinCatalog skin = skinCatalogRepository.findById(skinId).orElse(null);
                User user = userRepository.findById(userId.intValue()).orElse(null);

                UserSkin userSkin = new UserSkin();
                userSkin.setSkin(skin);
                userSkin.setFloatValue(floatValue);
                userSkin.setExterior(exterior);
                userSkin.setRarity(rarity);
                userSkin.setStattrak(stattrak);
                userSkin.setPrice(price);
                userSkin.setDropDate(dropDate);
                userSkin.setUser(user);

                userSkinRepository.save(userSkin);

            } catch (Exception e) {
                System.err.println("Fehler bei Zeile: " + line + "\n" + e);
            }
        }
    }
}