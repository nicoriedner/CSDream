package htlkaindorf.backend.repositories;

import htlkaindorf.backend.pojos.UserSkin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface UserSkinRepository extends JpaRepository<UserSkin, Integer> {
    @Query("SELECT u FROM UserSkin u WHERE u.userReferenceId = ?1")
    List<UserSkin> findAllByUserId(Integer userId);
}