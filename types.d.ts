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

type UserData = {
  username: string;
  email?: string;
  password: string;
};

type UserDataType = {
  username: string;
  fullname?: string;
  address?: string;
  bio?: string;
  profilePicture?: string;
};