package htlkaindorf.backend.csv;

import htlkaindorf.backend.pojos.Rarity;
import htlkaindorf.backend.pojos.SkinCatalog;
import htlkaindorf.backend.repositories.SkinCatalogRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
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
            throw new RuntimeException("CSV-Datei konnte nicht geladen werden");
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
                }

                String name = parts[1];
                String collection = parts[2];
                String rarityRaw = parts[3];
                String floatRangeRaw = parts[4];

                Rarity rarity = getSkinRarity(rarityRaw);

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
                skin.setImgUrl(getSkinImageUrl(getPlainSkinName(skin.getName())));

                catalogSkins.add(skin);
                skinCatalogRepository.save(skin);

            } catch (Exception e) {
                System.out.println("Fehler beim Verarbeiten der Zeile: " + line);
                e.printStackTrace();
            }
        }
    }

    private Rarity getSkinRarity(String rarityString) {
        return switch (rarityString.trim().toUpperCase()) {
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

    private String getPlainSkinName(String name) {
        // Den Präfix von goldenen Skins entfernen
        name = name.replaceFirst("★ ", "");

        // Damit ich nur die Waffe erhalte & nicht den Skin selbst
        if (name.contains("|")) {
            return name.split("\\|")[0].trim();
        }

        // Für vanilla skins
        String[] parts = name.split(" ");
        if (parts.length >= 2) {
            return parts[0] + " " + parts[1];
        }

        return name;
    }

    public String getSkinImageUrl(String skinName) {
        String basePath = "backend/src/main/resources/images/";

        // Liste aller Bilddateien
        String[] imageNames = {
                "ak47", "aug", "awp", "bayonet", "bizon", "bowie", "butterfly", "classic", "cz75", "daggers", "deagle",
                "dual", "falchion", "famas", "fiveseven", "flip", "g3sg1", "galil", "glock", "gloves", "gut", "huntsman",
                "karambit", "kukri", "m4a1", "m4a4", "m9", "m249", "mac10", "mag7", "mp5", "mp7", "mp9", "navaja", "negev",
                "nomad", "nova", "p90", "p250", "p2000", "parachord", "revolver", "sawedoff", "scar", "sg", "skeleton",
                "ssg", "stiletto", "survival", "talon", "tec", "ump", "ursus", "usp", "xm", "zeus"
        };

        for (String name : imageNames) {
            if (skinName.toLowerCase().contains(name)) {
                return basePath + name + ".png";
            }
        }
        if(skinName.toLowerCase().contains("wraps")) {
            return basePath + "gloves.png";
        }

        return null;
    }

}