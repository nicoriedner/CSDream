package htlkaindorf.backend.pojos;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cases")
public class Case {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Long price;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "cases_possible_skins", // Name der Join-Tabelle in deiner Datenbank
            joinColumns = @JoinColumn(name = "case_id"), // Spalte in "cases_possible_skins", die auf die 'cases'-Tabelle verweist
            inverseJoinColumns = @JoinColumn(name = "possible_skins_id") // Spalte in "cases_possible_skins", die auf die 'skin_catalog'-Tabelle verweist
    )

    private List<SkinCatalog> possibleSkins;
}