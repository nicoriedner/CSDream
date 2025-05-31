package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.SkinCatalogDTO;
import org.example.backend.service.SkinCatalogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/skincatalog")
@RequiredArgsConstructor
public class SkinCatalogController {
    private final SkinCatalogService skinCatalogService;

    @GetMapping
    public ResponseEntity<Iterable<SkinCatalogDTO>> getSkinCatalog() {
        return ResponseEntity.ok(skinCatalogService.findAllSkinFromCatalog());
    }
}
