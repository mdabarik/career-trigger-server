export interface ICategoryDTO {
    _id: string;
    name: string;
}

export interface ICategoryServiceReader {
    GetAllCategory(): Promise<ICategoryDTO[]>;
    GetCategoryById(id: string): Promise<ICategoryDTO | null>;
}
