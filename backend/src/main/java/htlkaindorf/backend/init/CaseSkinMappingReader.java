package htlkaindorf.backend.init;

import htlkaindorf.backend.pojos.Case;
import htlkaindorf.backend.pojos.SkinCatalog;
import htlkaindorf.backend.repositories.CaseRepository;
import htlkaindorf.backend.repositories.SkinCatalogRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.*;

@Component
@DependsOn("catalogReader")
@RequiredArgsConstructor
public class CaseSkinMappingReader {

    private final CaseRepository caseRepository;
    private final SkinCatalogRepository skinCatalogRepository;

    @PostConstruct
    public void loadCaseSkinMappings() {
        try {
            InputStream inputStream = getClass().getClassLoader().getResourceAsStream("csv/case_skins_mapping.csv");
            if (inputStream == null) {
                throw new RuntimeException("Mapping-CSV konnte nicht geladen werden.");
            }

            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
            Map<Long, List<SkinCatalog>> caseSkinsMap = new HashMap<>();

            reader.lines().skip(1).forEach(line -> {
                String[] parts = line.split(",");
                if (parts.length != 2) return;

                long caseId = Long.parseLong(parts[0].trim());
                int skinId = Integer.parseInt(parts[1].trim());

                SkinCatalog skin = skinCatalogRepository.findById(skinId).orElse(null);
                if (skin != null) {
                    caseSkinsMap.computeIfAbsent(caseId, k -> new ArrayList<>()).add(skin);
                }
            });

            for (Map.Entry<Long, List<SkinCatalog>> entry : caseSkinsMap.entrySet()) {
                Case c = caseRepository.findById(entry.getKey()).orElse(null);
                if (c != null) {
                    c.setPossibleSkins(entry.getValue());
                    caseRepository.save(c);
                }
            }

            System.out.println("Case-Skin-Zuordnung erfolgreich geladen.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}