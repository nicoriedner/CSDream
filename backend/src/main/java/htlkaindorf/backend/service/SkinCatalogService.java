package htlkaindorf.backend.service;

import htlkaindorf.backend.dto.SkinCatalogDTO;
import htlkaindorf.backend.mapper.SkinCatalogMapper;
import htlkaindorf.backend.pojos.SkinCatalog;
import htlkaindorf.backend.repositories.SkinCatalogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
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