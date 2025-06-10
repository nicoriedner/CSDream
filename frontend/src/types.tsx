export interface SkinCatalog {
    id: number;
    name: string;
    collectionOrCase: string;
    rarity: string;
    imgUrl: string;
    floatMin: number;
    floatMax: number;
}

export interface UserSkin {
    id: number;
    skinId: number;
    userId: number;
    price: number;
    rarity: string;
    stattrak: boolean;
    floatValue: number;
    exterior: string;
    dropDate: string;
    skin: SkinCatalog;
}