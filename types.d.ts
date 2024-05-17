type Article = {
  post_id: number;
  post_uuid: string;
  post_categories: string[];
  post_primary_category: string;
  image: string;
  user_name: string;
  post_description: string;
  post_title: string;
  post_body: string;
  post_image: string;
  post_created_time: string;
  readTime: string;
  post_data: [
    {
      post_categories: [];
    }
  ];
};

type HomePageUserData = {};

type HomePageFirstTenUserPosts = {
  post_author: string;
  post_id: number;
  post_uuid: string;
  post_title: string;
  post_description: string;
  post_body: string;
  post_image: string;
  post_primary_category: string;
  post_categories: string[];
  post_created_time: string;
};
