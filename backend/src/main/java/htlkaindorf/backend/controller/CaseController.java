package htlkaindorf.backend.controller;

import htlkaindorf.backend.dto.UserSkinDTO;
import htlkaindorf.backend.pojos.Case;
import htlkaindorf.backend.service.CaseService;
import htlkaindorf.backend.service.UserSkinService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cases")
@AllArgsConstructor
public class CaseController {

    private final CaseService caseService;
    private final UserSkinService userSkinService;

    @GetMapping("/allCases")
    public List<Case> getAllCases() {
        return caseService.getAllCases();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Case> getCase(@PathVariable Long id) {
        return caseService.getCaseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/caseunboxing/openCase")
    public ResponseEntity<UserSkinDTO> openCase(@RequestParam Long caseId, @RequestParam Integer userId) {
        Optional<Case> optionalCase = caseService.getCaseById(caseId);
        if (optionalCase.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        UserSkinDTO dto = caseService.openCase(optionalCase.get(), userId);
        return ResponseEntity.ok(dto);
    }
}