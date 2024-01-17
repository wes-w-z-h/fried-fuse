import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopicObj from "../types/TopicObj";

const CategoryView = () => {
  const { id } = useParams();
  const [topics, setTopics] = useState<TopicObj[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/categories/${id}`)
      .then((resp) => {
        // console.log(resp.data.included);
        setTopics(resp.data.included);
      })
      .catch((error) => console.log(error));
  }, [topics.length]);

  // TODO:
  // map all to a topic component
  const list = topics.map((item) => {
    return (
      <div key={item.id}>
        <p>title: {item.attributes.title}</p>
        <p>content: {item.attributes.content}</p>
        <p>slug: {item.attributes.slug}</p>
      </div>
    );
  });

  return (
    <div>
      <ul>{list}</ul>
    </div>
  );
};
export default CategoryView;
