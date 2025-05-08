package htlkaindorf.backend.entity;

import jakarta.persistence.*;

@Entity
public class Skin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String rarity;
    private double value;

    @ManyToOne
    @JoinColumn(name = "inventory_id")
    private Inventory inventory;
}
