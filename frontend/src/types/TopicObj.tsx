type TopicObj = {
  attributes: {
    title: string;
    content: string;
    category_id: number;
    slug: string;
  };
  id: number;
  type: "topic";
};

export default TopicObj;
