package org.example.backend.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.backend.pojos.Rarity;

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
