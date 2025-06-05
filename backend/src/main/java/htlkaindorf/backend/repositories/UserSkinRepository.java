package htlkaindorf.backend.repositories;

import htlkaindorf.backend.pojos.Exterior;
import htlkaindorf.backend.pojos.SkinCatalog;
import htlkaindorf.backend.pojos.UserSkin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface UserSkinRepository extends JpaRepository<UserSkin, Integer> {
    //skin_id,float_value,exterior,rarity,is_stattrak,price,drop_date,user_id
    @Query("SELECT s FROM UserSkin s")
    List<UserSkin> findAllUserSkins();

    @Query("SELECT s FROM UserSkin s WHERE s.skin = ?1")
    UserSkin findUserSkinByName(SkinCatalog skin);

    @Query("SELECT s FROM UserSkin s JOIN User u ON u.id = s.userId WHERE u.id = ?1")
    List<UserSkin> findAllSkinsByUser(Integer userId);

    @Query("SELECT s FROM UserSkin s WHERE s.dropDate = ?1")
    List<UserSkin> findAllSkinsByDate(LocalDate date);

    @Query("SELECT s FROM UserSkin s WHERE s.exterior = ?1")
    List<UserSkin> findAllUserSkinsByExterior(Exterior exterior);

}