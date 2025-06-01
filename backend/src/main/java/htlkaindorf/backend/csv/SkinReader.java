package htlkaindorf.backend.csv;

import htlkaindorf.backend.pojos.Exterior;
import htlkaindorf.backend.pojos.Rarity;
import htlkaindorf.backend.pojos.UserSkin;
import htlkaindorf.backend.repositories.UserSkinRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
public class SkinReader {

    private List<UserSkin> userSkins = new ArrayList<>();

    @Autowired
    private UserSkinRepository userSkinRepository;

    @PostConstruct
    public void readSkins() {

        InputStream inputStream = getClass().getClassLoader().getResourceAsStream("csv/userSkin.csv");
        List<String> lines = new BufferedReader(new InputStreamReader(inputStream))
                .lines()
                .skip(1)
                .toList();
        //skin_id,float_value,exterior,rarity,is_stattrak,price,drop_date,user_id
        for(String line : lines) {
            UserSkin userSkin = new UserSkin();
            String[] parts = line.split(",");
            if(parts[1].equals("None - None")) {
                userSkin.setFloatValue(0f);
            }
            userSkin.setFloatValue(Float.parseFloat(parts[1]));
            userSkin.setExterior(Exterior.valueOf(parts[2]));
            if (parts[3].endsWith(" Grade")) {
                parts[3] = parts[2].replace(" Grade", "");
            }
            userSkin.setRarity(Rarity.valueOf(parts[3].replace("-","_").toUpperCase()));
            userSkin.setIsStattrak(Boolean.parseBoolean(parts[4]));
            userSkin.setPrice(Float.parseFloat(parts[5]));
            userSkin.setDropDate(LocalDate.parse(parts[6]));
            userSkin.setUserId(Long.parseLong(parts[7]));
            userSkins.add(userSkin);
            userSkinRepository.save(userSkin);
        }

    }
}