package htlkaindorf.backend.controller;

import htlkaindorf.backend.dto.SkinCatalogDTO;
import htlkaindorf.backend.service.SkinCatalogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/skincatalog")
@RequiredArgsConstructor
public class SkinCatalogController {
    private final SkinCatalogService skinCatalogService;

    @GetMapping
    public ResponseEntity<Iterable<SkinCatalogDTO>> getSkinCatalog() {
        return ResponseEntity.ok(skinCatalogService.findAllSkinFromCatalog());
    }
}