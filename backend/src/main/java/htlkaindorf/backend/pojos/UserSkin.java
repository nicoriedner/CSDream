package htlkaindorf.backend.pojos;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "skin_id")
    private SkinCatalog skin;

    @Column(name = "float_value")
    private Float floatValue;

    private Exterior exterior;

    private Rarity rarity;

    private Boolean isStattrak;

    private Float price;

    @Column(name = "drop_date")
    private LocalDate dropDate;

    @Column(name = "user_id")
    private Long userId;

}