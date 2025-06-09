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

    @ManyToOne
    @JoinColumn(name = "skin_id", referencedColumnName = "id")
    private SkinCatalog skin;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

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
}