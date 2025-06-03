package htlkaindorf.backend.repositories;

import htlkaindorf.backend.pojos.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("SELECT u FROM User u")
    List<User> findAllUsers();

    @Query("SELECT u FROM User u WHERE u.username = ?1")
    User findUserByUsername(String username);

    @Query("SELECT u FROM User u WHERE u.birthdate = ?1")
    User findUserByBirthdate(LocalDate birthdate);

    @Query("SELECT u FROM User u WHERE u.email = ?1")
    User findUserByEmail(String email);
}