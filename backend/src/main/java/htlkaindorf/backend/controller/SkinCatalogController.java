package htlkaindorf.backend.controller;

import htlkaindorf.backend.dto.SkinCatalogDTO;
import htlkaindorf.backend.pojos.SkinCatalog;
import htlkaindorf.backend.service.SkinCatalogService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/api/skinCatalog")
@RequiredArgsConstructor
public class SkinCatalogController {
    private static final Logger log = LoggerFactory.getLogger(SkinCatalogController.class);
    private final SkinCatalogService skinCatalogService;

    @GetMapping("/all")
    public ResponseEntity<Iterable<SkinCatalogDTO>> getSkinCatalog() {
        List<SkinCatalogDTO> skinCatalogDTOS = skinCatalogService.findAllSkinFromCatalog();
        return ResponseEntity.ok(skinCatalogDTOS);
    }
}