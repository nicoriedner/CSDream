package htlkaindorf.backend.dto;

import htlkaindorf.backend.pojos.Rarity;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class SkinCatalogDTO {
    private int id;
    private String name;
    private String collectionOrCase;
    private Rarity rarity;
    private Float floatMin;
    private Float floatMax;
}