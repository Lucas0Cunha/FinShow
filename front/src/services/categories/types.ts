export interface Category {
  _id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  name: string;
  userId: string;
}

export type CategoriesListResponse = Category[];
