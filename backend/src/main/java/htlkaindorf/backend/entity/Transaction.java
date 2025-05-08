package htlkaindorf.backend.entity;


import jakarta.persistence.*;

@Entity
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String transactionType;
    private double amount;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}