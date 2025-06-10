package htlkaindorf.backend.mapper;

import htlkaindorf.backend.dto.UserDTO;
import htlkaindorf.backend.dto.UserSkinDTO;
import htlkaindorf.backend.pojos.User;
import htlkaindorf.backend.pojos.UserSkin;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDTO toDto(User userSkin);
}