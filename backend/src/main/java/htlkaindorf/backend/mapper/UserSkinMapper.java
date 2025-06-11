package htlkaindorf.backend.mapper;

import htlkaindorf.backend.dto.UserSkinDTO;
import htlkaindorf.backend.pojos.UserSkin;
import org.mapstruct.*;
import java.util.List;

@Mapper(componentModel = "spring", uses = SkinCatalogMapper.class)
public interface UserSkinMapper {
    UserSkinDTO toDto(UserSkin userSkin);
    List<UserSkinDTO> toDtoList(List<UserSkin> skins);
    UserSkin toEntity(UserSkinDTO userSkinDTO);
    List<UserSkin> toEntityList(List<UserSkinDTO> userSkinDTOs);
}