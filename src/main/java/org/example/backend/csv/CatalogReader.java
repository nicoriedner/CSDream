package org.example.backend.csv;

import org.example.backend.pojos.Rarity;
import org.example.backend.pojos.SkinCatalog;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class CatalogReader {

    private List<SkinCatalog> catalogSkins;

    public List<SkinCatalog> readCatalog() {
        try {
            List<String> lines = Files.readAllLines(Path.of("src/main/resources/all_skins.csv"));

            //name,collection_or_case,rarity,float_category
            for(String line : lines) {
                String[] parts = line.split(",");
                Rarity rarity = Enum.valueOf(Rarity.class, parts[3]);
                SkinCatalog skin = new SkinCatalog();
                String floatRange[] = parts[3].split(",");
                Float floatMin = Float.parseFloat(floatRange[0]);
                Float floatMax = Float.parseFloat(floatRange[1]);

                skin.setId(catalogSkins.size()+1);
                skin.setName(parts[0]);
                skin.setCollectionOrCase(parts[1]);
                skin.setRarity(rarity);
                skin.setFloatMin(floatMin);
                skin.setFloatMax(floatMax);
                catalogSkins.add(skin);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return catalogSkins;
    }
}
