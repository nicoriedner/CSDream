package htlkaindorf.backend.repositories;

import htlkaindorf.backend.pojos.Case;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CaseRepository extends JpaRepository<Case, Long> {
}