export const GenreEnum = {
  FICTION: 'FICTION',
  NON_FICTION: 'NON_FICTION',
  SCIENCE: 'SCIENCE',
  HISTORY: 'HISTORY',
  BIOGRAPHY: 'BIOGRAPHY',
  FANTASY: 'FANTASY',
} as const;

export type GenreEnum = (typeof GenreEnum)[keyof typeof GenreEnum];

export interface IBook {
  _id?: string;
  title: string;
  author: string;
  genre: GenreEnum;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  updateAvailability?: () => void;
}
