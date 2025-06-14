package htlkaindorf.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import htlkaindorf.backend.pojos.*;
import lombok.*;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSkinDTO {
    private int id;
    private Integer skinCatalogId;
    private Float floatValue;
    private Exterior exterior;
    private Rarity rarity;
    private Boolean stattrak;
    private Float price;
    private LocalDate dropDate;
    private SkinCatalog skin;
    @JsonProperty("userId")
    private Integer userReferenceId;
}