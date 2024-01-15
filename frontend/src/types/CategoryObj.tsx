type CategoryObj = {
  attributes: {
    name: string;
    description: string;
    img_url: string;
  };
  id: string;
  relationships: {
    topics: {
      data: [{ id: string; type: "topic" }];
    };
  };
  type: "category";
};

export default CategoryObj;
