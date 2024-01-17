type CategoryDataObj = {
  attributes: {
    name: string;
    description: string;
    img_url: string;
  };
  id: string;
  // relationships: {
  //   topics: {
  //     data: [{ id: string; type: "topic" }];
  //   };
  // };
  type: "category";
};

// type CategoryIncludeObj = {
//   attributes: {
//     category_id: number;
//     content: string;
//     slug: string;
//     title: string;
//   };
//   id: string;
//   relationships: {
//     posts: {
//       data: [{ id: string; type: "post" }];
//     };
//   };
//   type: "topic";
// };

export type { CategoryDataObj };
