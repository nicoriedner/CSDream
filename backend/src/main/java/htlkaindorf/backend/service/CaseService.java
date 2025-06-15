package htlkaindorf.backend.service;

import htlkaindorf.backend.dto.UserSkinDTO;
import htlkaindorf.backend.pojos.*;
import htlkaindorf.backend.unboxing.CaseUnboxing;
import htlkaindorf.backend.repositories.CaseRepository;
import htlkaindorf.backend.repositories.UserSkinRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CaseService {

    private final CaseRepository caseRepository;
    private final CaseUnboxing caseUnboxing;
    private final UserSkinRepository userSkinRepository;

    public List<Case> getAllCases() {
        return caseRepository.findAll();
    }

    public Optional<Case> getCaseById(Long id) {
        return caseRepository.findById(id);
    }

    public UserSkinDTO openCase(Case c, Integer userId) {
        int before = userSkinRepository.findAllByUserId(userId).size();
        caseUnboxing.unboxCase(c, userId);
        List<UserSkin> skins = userSkinRepository.findAllByUserId(userId);
        if (skins.size() <= before) {
            throw new RuntimeException("Unboxing fehlgeschlagen oder kein neuer Skin erstellt.");
        }
        UserSkin newSkin = skins.get(skins.size() - 1);

        UserSkinDTO dto = new UserSkinDTO();
        dto.setSkinCatalogId(newSkin.getSkinCatalogId());
        dto.setFloatValue(newSkin.getFloatValue());
        dto.setExterior(Exterior.valueOf(newSkin.getExterior().name()));
        dto.setRarity(Rarity.valueOf(newSkin.getRarity().name()));
        dto.setStattrak(newSkin.getStattrak());
        dto.setUserReferenceId(newSkin.getUserReferenceId());
        dto.setPrice(newSkin.getPrice());
        dto.setDropDate(LocalDate.parse(newSkin.getDropDate().toString()));
        return dto;
    }
}