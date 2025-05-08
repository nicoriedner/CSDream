package htlkaindorf.backend.entity;

import jakarta.persistence.*;

@Entity
public class Log {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String actionType;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}