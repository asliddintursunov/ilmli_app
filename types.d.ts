type Article = {
  id: number;
  category?: string;
  image: string;
  name: string;
  description?: string;
  title: string;
  posted: string;
  readTime: string;
};
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
    image: string;
    creationAt: string;
    updatedAt: string;
  };
};
