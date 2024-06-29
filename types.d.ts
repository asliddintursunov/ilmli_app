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
  post_data: {
    post_categories: [];
  };
};

type HomePageFirstTenUserPosts = {
  user_name?: string;
  post_author?: string;
  post_id: number;
  post_uuid: string;
  post_title: string;
  post_description: string;
  post_body: string;
  post_image: string;
  post_primary_category: string;
  post_categories: string[];
  post_created_time: string;
  post_categories: string[];
  post_created_time: string;
  post_description: string;
  post_id: number;
  post_primary_category: string;
  post_title: string;
  post_uuid: string;
};

type GetUserData = {
  user_name: string;
  user_email: string;
  user_fullname: string | null;
  user_phone_number: string | null;
  user_profile_photo: string | null;
  user_social_links:
    | {
        link: string;
        platform: string;
      }[]
    | null;
  user_interests: string[];
  user_bio: string | null;
};

type PostUserData = {
  user_name: string | undefined;
  user_email: string | undefined;
  user_fullname?: string;
  user_phone_number?: string;
  user_profile_photo?: string;
  user_social_links?:
    | {
        link: string;
        platform: string;
      }[];
  user_interests?: string[];
  user_bio?: string;
};
