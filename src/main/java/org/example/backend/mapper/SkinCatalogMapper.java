package org.example.backend.mapper;

import org.example.backend.dto.SkinCatalogDTO;
import org.example.backend.pojos.SkinCatalog;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface SkinCatalogMapper {

    @Mappings({
            @Mapping(source = "id", target = "id"),
    })
    SkinCatalogDTO toDTO(SkinCatalog skinCatalog);
}
