package htlkaindorf.backend.csv;

import htlkaindorf.backend.pojos.Rarity;
import htlkaindorf.backend.pojos.SkinCatalog;
import htlkaindorf.backend.repositories.SkinCatalogRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

@Component
public class CatalogReader {

    private List<SkinCatalog> catalogSkins = new ArrayList<>();
    @Autowired
    private SkinCatalogRepository skinCatalogRepository;

    @PostConstruct
    public void readCatalog() {
            InputStream inputStream = getClass().getClassLoader().getResourceAsStream("csv/all_skins.csv");
            List<String> lines = new BufferedReader(new InputStreamReader(inputStream))
                    .lines()
                    .skip(1)
                    .toList();
            //name,collection_or_case,rarity,float_category
            for(String line : lines) {
                String[] parts = line.split(",");
                if (parts[2].endsWith(" Grade")) {
                    parts[2] = parts[2].replace(" Grade", "");
                }
                Rarity rarity = Rarity.valueOf(parts[2].replace("-","_").toUpperCase());
                SkinCatalog skin = new SkinCatalog();
                if(parts[3].equals("None - None")) {
                    skin.setFloatMin(0f);
                    skin.setFloatMax(0f);
                } else {
                    String[] floatRange = parts[3].split("-");
                    skin.setFloatMin(Float.parseFloat(floatRange[0].trim()));
                    skin.setFloatMax(Float.parseFloat(floatRange[1].trim()));
                }
                skin.setName(parts[0]);
                skin.setCollectionOrCase(parts[1]);
                skin.setRarity(rarity);

                catalogSkins.add(skin);
                skinCatalogRepository.save(skin);
            }
    }
}