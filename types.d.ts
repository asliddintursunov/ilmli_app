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

type UserDataType = {
  user_name: string;
  user_email?: string;
  user_interests?: string[];
  user_fullname?: string;
  user_address?: string;
  user_bio?: string;
  user_profilePicture?: string;
};
