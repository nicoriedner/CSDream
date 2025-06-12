export interface UserSkin {
    id: number;
    userId: number;
    skinCatalogId: number;
    floatValue: number;
    exterior: string;
    rarity: string;
    stattrak: boolean;
    price: number;
    dropDate: string;
    skin: SkinCatalog;
    renamedTo?: string;
}

export interface SkinCatalog {
    id: number;
    name: string;
    imgUrl: string;
    collectionOrCase: string;
    rarity: string;
}