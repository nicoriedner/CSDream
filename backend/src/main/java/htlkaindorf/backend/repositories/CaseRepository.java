package htlkaindorf.backend.repositories;

import htlkaindorf.backend.pojos.Case;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CaseRepository extends JpaRepository<Case, Long> {
    @Query("SELECT c FROM Case c WHERE c.name = ?1")
    public Case findByName(String name);

    @Query("SELECT c FROM Case c WHERE c.id = ?1")
    public Case findById(long id);

    @Query("SELECT c FROM Case c JOIN FETCH c.possibleSkins")
    List<Case> findAllWithSkins();
}