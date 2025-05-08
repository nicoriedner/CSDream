package htlkaindorf.backend.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "inventory", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Skin> skins;
}
