type Trending = {
  id: number;
  pic: string;
  name: string;
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