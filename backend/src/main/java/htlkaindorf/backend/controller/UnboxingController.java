package htlkaindorf.backend.controller;

import htlkaindorf.backend.pojos.Case;
import htlkaindorf.backend.pojos.UpgradeRequest;
import htlkaindorf.backend.repositories.CaseRepository;
import htlkaindorf.backend.unboxing.CaseUnboxing;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/caseunboxing")
@AllArgsConstructor
public class UnboxingController {

    private final CaseUnboxing caseUnboxing;
    private final CaseRepository caseRepository;

    @PostMapping("/openCase")
    public ResponseEntity<String> openCase(
            @RequestParam("caseId") Long caseId,
            @RequestParam("userId") Integer userId) {
        try {
            Case caseToOpen = caseRepository.findById(caseId).orElse(null);
            caseUnboxing.unboxCase(caseToOpen, userId);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.OK).body("Case opened");
    }

}