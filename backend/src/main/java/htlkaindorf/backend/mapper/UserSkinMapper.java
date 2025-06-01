package htlkaindorf.backend.mapper;

import htlkaindorf.backend.dto.SkinCatalogDTO;
import htlkaindorf.backend.dto.UserSkinDTO;
import htlkaindorf.backend.pojos.SkinCatalog;
import htlkaindorf.backend.pojos.UserSkin;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface UserSkinMapper {

    @Mappings({
            @Mapping(source = "id", target = "id"),
    })
    UserSkinDTO toDTO(UserSkin userSkin);
}
