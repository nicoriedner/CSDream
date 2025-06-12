export interface SkinCatalog {
    name: string;
    collectionOrCase: string;
    rarity: string;
    floatMin: number;
    floatMax: number;
}

export interface UserSkin {
    id: number;
    floatValue: number;
    exterior: string;
    rarity: string;
    isStattrak: boolean;
    price: number;
    dropDate: string;
    renamedTo?: string;
    skin: SkinCatalog;
}