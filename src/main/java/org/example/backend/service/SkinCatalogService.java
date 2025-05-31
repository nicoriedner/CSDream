package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.SkinCatalogDTO;
import org.example.backend.mapper.SkinCatalogMapper;
import org.example.backend.pojos.SkinCatalog;
import org.example.backend.repositories.SkinCatalogRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SkinCatalogService {

    public final SkinCatalogRepository skinCatalogRepository;
    public final SkinCatalogMapper skinCatalogMapper;

    public List<SkinCatalogDTO> findAllSkinFromCatalog() {
        List<SkinCatalog> skinCatalogList = skinCatalogRepository.findAll();

        return skinCatalogList.stream()
                .map(skinCatalogMapper::toDTO)
                .collect(Collectors.toList());
    }

}
