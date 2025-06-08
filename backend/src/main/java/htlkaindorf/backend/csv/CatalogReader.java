package htlkaindorf.backend.csv;

import htlkaindorf.backend.pojos.Rarity;
import htlkaindorf.backend.pojos.SkinCatalog;
import htlkaindorf.backend.repositories.SkinCatalogRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Component
public class CatalogReader {

    private final List<SkinCatalog> catalogSkins = new ArrayList<>();

    @Autowired
    private SkinCatalogRepository skinCatalogRepository;

    @PostConstruct
    public void readCatalog() {
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream("csv/all_skins.csv");
        if (inputStream == null) {
            throw new RuntimeException("CSV-Datei 'all_skins.csv' nicht gefunden");
        }

        List<String> lines = new BufferedReader(new InputStreamReader(inputStream))
                .lines()
                .skip(1)
                .toList();

        for (String line : lines) {
            try {
                String[] parts = line.split(",", -1);

                if (parts.length < 5) {
                    System.out.println("Ungültige Zeile übersprungen: " + line);
                    continue;
                }

                String name = parts[1];
                String collection = parts[2];
                String rarityRaw = parts[3];
                String floatRangeRaw = parts[4];

                Rarity rarity = mapRarity(rarityRaw);
                if (rarity == null) {
                    System.out.println("Unbekannter Rarity-Wert: '" + rarityRaw + "' → Zeile übersprungen: " + line);
                    continue;
                }

                float floatMin = 0f;
                float floatMax = 0f;
                if (!floatRangeRaw.equalsIgnoreCase("None - None")) {
                    String[] floatRange = floatRangeRaw.split("-");
                    floatMin = Float.parseFloat(floatRange[0].trim());
                    floatMax = Float.parseFloat(floatRange[1].trim());
                }

                SkinCatalog skin = new SkinCatalog();
                skin.setName(name);
                skin.setCollectionOrCase(collection);
                skin.setRarity(rarity);
                skin.setFloatMin(floatMin);
                skin.setFloatMax(floatMax);

                catalogSkins.add(skin);
                skinCatalogRepository.save(skin);

            } catch (Exception e) {
                System.out.println("Fehler beim Verarbeiten der Zeile: " + line);
                e.printStackTrace();
            }
        }
    }

    private Rarity mapRarity(String raw) {
        return switch (raw.trim().toUpperCase()) {
            case "CONSUMER GRADE" -> Rarity.CONSUMER;
            case "INDUSTRIAL GRADE" -> Rarity.INDUSTRIAL;
            case "MIL-SPEC", "MILSPEC", "MIL-SPEC GRADE" -> Rarity.MIL_SPEC;
            case "RESTRICTED" -> Rarity.RESTRICTED;
            case "CLASSIFIED" -> Rarity.CLASSIFIED;
            case "COVERT" -> Rarity.COVERT;
            case "EXTRAORDINARY" -> Rarity.EXTRAORDINARY;
            default -> null;
        };
    }
}