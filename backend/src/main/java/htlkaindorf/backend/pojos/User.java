package htlkaindorf.backend.pojos;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String username;
    private String password;

    private String email;

    @DateTimeFormat(pattern = "dd.MM.yyyy")
    private LocalDate birthdate;
    private String avatar;

    private Float balance;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserSkin> userSkins;
}