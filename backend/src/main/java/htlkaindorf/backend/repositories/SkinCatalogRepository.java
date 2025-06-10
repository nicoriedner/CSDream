package htlkaindorf.backend.repositories;

import htlkaindorf.backend.pojos.Rarity;
import htlkaindorf.backend.pojos.SkinCatalog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SkinCatalogRepository extends JpaRepository<SkinCatalog, Integer> {
    @Query("SELECT s FROM SkinCatalog s")
    List<SkinCatalog> findAllSkins();

    @Query("SELECT s FROM SkinCatalog s WHERE s.name = ?1")
    SkinCatalog findSkinByName(String name);

    @Query("SELECT s FROM SkinCatalog s WHERE s.collectionOrCase = ?1")
    List<SkinCatalog> findSkinByCollectionOrCase(String name);

    @Query("SELECT s FROM SkinCatalog s WHERE s.rarity = ?1")
    List<SkinCatalog> findSkinByRarity(Rarity rarity);

    @Query("SELECT s FROM SkinCatalog s WHERE s.floatMin = ?1 AND s.floatMax = ?2")
    List<SkinCatalog> findSkinByFloatRange(float floatMin, float floatMax);

}