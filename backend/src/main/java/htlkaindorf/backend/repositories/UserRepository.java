package htlkaindorf.backend.repositories;

import htlkaindorf.backend.pojos.User;
import htlkaindorf.backend.pojos.UserSkin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("SELECT u FROM User u WHERE u.username = ?1")
    User findByUsername(String username);

}