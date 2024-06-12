export interface ProductInterface {
  id: number;
  categoryId: number[];
  name: string;
  description: string;
  img: string;
  imgDescription: string[];
  promotionalPrice: number;
  cornerPrice: number;
  developer: string;
  video: string;
  views: number;
  trend: number;
  rate: number;
}
