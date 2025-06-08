package htlkaindorf.backend.pojos;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "skin_catalog")
public class SkinCatalog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @Column(name = "collection_or_case")
    private String collectionOrCase;

    @Enumerated(EnumType.STRING)
    @Column(name = "rarity")
    private Rarity rarity;

    @Column(name = "float_min")
    private Float floatMin;

    @Column(name = "float_max")
    private Float floatMax;
}