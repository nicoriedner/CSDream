package htlkaindorf.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpgradeRequestDTO {
    private List<Integer> userSkinIds;
    private float chanceInPercentage;
    private int userId;
}
