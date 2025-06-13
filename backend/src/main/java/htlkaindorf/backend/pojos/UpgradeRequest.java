package htlkaindorf.backend.pojos;

import lombok.Data;

import java.util.List;

@Data
public class UpgradeRequest {
    private List<UserSkin> userSkins;
    private float chanceInPercentage;
    private int userId;
}
