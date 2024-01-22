type TopicObj = {
  attributes: {
    title: string;
    content: string;
    category_id: number;
    user_id: number;
    slug: string;
  };
  id: string;
  type: "topic";
};

export default TopicObj;
