package htlkaindorf.backend.mapper;


import htlkaindorf.backend.dto.SkinCatalogDTO;
import htlkaindorf.backend.pojos.SkinCatalog;
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