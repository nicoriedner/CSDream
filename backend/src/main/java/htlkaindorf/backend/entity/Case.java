package htlkaindorf.backend.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Case {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private double price;

    @ManyToMany(mappedBy = "cases")
    private List<User> users;

    @ManyToMany
    @JoinTable(
            name = "case_skin",
            joinColumns = @JoinColumn(name = "case_id"),
            inverseJoinColumns = @JoinColumn(name = "skin_id")
    )
    private List<Skin> skins;
}