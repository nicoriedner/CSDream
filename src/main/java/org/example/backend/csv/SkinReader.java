package org.example.backend.csv;

import org.example.backend.pojos.Exterior;
import org.example.backend.pojos.Rarity;
import org.example.backend.pojos.UserSkin;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.List;

public class SkinReader {

    private List<UserSkin> userSkins;

    public List<UserSkin> readSkins() {

        try {
            List<String> lines = Files.readAllLines(Path.of("src/main/resources/csv/userSkin.csv"));
            //skin_id,float_value,exterior,rarity,is_stattrak,price,drop_date,user_id
            for(String line : lines) {
                UserSkin userSkin = new UserSkin();
                String[] parts = line.split(",");
                userSkin.setId(Integer.parseInt(parts[0]));
                userSkin.setFloatValue(Float.parseFloat(parts[1]));
                userSkin.setExterior(Exterior.valueOf(parts[2]));
                userSkin.setRarity(Rarity.valueOf(parts[3]));
                userSkin.setIsStattrak(Boolean.parseBoolean(parts[4]));
                userSkin.setPrice(Float.parseFloat(parts[5]));
                userSkin.setDropDate(LocalDate.parse(parts[6]));
                userSkin.setUserId(Long.parseLong(parts[7]));
                userSkins.add(userSkin);
            }

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return userSkins;
    }
}
