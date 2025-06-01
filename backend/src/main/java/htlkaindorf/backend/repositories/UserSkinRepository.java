package htlkaindorf.backend.repositories;

import htlkaindorf.backend.pojos.SkinCatalog;
import htlkaindorf.backend.pojos.UserSkin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserSkinRepository extends JpaRepository<UserSkin, Integer> {

    @Query("SELECT s FROM UserSkin s")
    List<UserSkin> findAllUserSkins();

    @Query("SELECT s FROM UserSkin s WHERE s.skin = ?1")
    SkinCatalog findUserSkinByName(SkinCatalog skin);
}
