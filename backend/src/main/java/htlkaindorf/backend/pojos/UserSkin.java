package htlkaindorf.backend.pojos;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user_skin")
public class UserSkin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "skin_catalog_id", nullable = false)
    private Integer skinCatalogId;

    @Column(name = "user_id")
    private Integer userReferenceId;

    @Column(name = "float_value")
    private Float floatValue;

    @Enumerated(EnumType.STRING)
    private Exterior exterior;

    @Enumerated(EnumType.ORDINAL)
    private Rarity rarity;

    private Boolean stattrak;

    private Float price;

    @Column(name = "drop_date")
    private LocalDate dropDate;

    @ManyToOne
    @JoinColumn(name = "skin_id")
    private SkinCatalog skin;
}