package htlkaindorf.backend.repositories;

import htlkaindorf.backend.pojos.UserSkin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserSkinRepository extends JpaRepository<UserSkin, Integer> {

    @Query("SELECT u FROM UserSkin u WHERE u.userReferenceId = ?1")
    List<UserSkin> findAllByUserId(Integer userId);

    @Query("SELECT u FROM UserSkin u JOIN FETCH SkinCatalog s ON s.id = u.skinCatalogId WHERE u.userReferenceId = ?1")
    List<UserSkin> findAllByUserIdWithSkin(Integer userId);

    boolean existsByUserReferenceIdAndSkinCatalogId(Integer userId, Integer skinCatalogId);

    Optional<UserSkin> findByUserReferenceIdAndSkinCatalogId(Integer userId, Integer skinCatalogId);

    Optional<UserSkin> findByUserReferenceIdAndId(Integer userId, Integer skinId);

}