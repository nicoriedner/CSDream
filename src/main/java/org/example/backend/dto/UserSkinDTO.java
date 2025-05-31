package org.example.backend.dto;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.backend.pojos.Exterior;
import org.example.backend.pojos.Rarity;
import org.example.backend.pojos.SkinCatalog;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSkinDTO {
    private int id;
    private SkinCatalog skin;
    private Float floatValue;
    private Exterior exterior;
    private Rarity rarity;
    private Boolean isStattrak;
    private Float price;
    private LocalDate dropDate;
    private Long userId;
}
