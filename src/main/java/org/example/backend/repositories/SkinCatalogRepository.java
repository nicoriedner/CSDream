package org.example.backend.repositories;

import org.example.backend.pojos.SkinCatalog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SkinCatalogRepository extends JpaRepository<SkinCatalog, Integer> {

    @Query("SELECT s FROM SkinCatalog s")
    List<SkinCatalog> findAllSkins();

    @Query("SELECT s FROM SkinCatalog s WHERE s.name = ?1")
    SkinCatalog findSkinByName(String name);
}
