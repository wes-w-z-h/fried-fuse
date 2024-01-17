type TopicObj = {
  attributes: {
    title: string;
    content: string;
    category_id: number;
    slug: string;
  };
  id: number;
  //   relationships: {
  //     posts: {
  //       [{ id: string, type: "post" }];
  //     };
  //   };
  type: "topic";
};

export default TopicObj;
