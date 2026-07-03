export interface CategoryResponse {
  id: string;
  parentId: string | null;
  name: string;
  slug: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    courses: number;
  };
}

export interface CategoryTreeNode extends CategoryResponse {
  children: CategoryTreeNode[];
}
