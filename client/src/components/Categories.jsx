import { useEffect, useState } from "react";

import { publicRequest } from "../requestMethods";

import CategoryItem from "./CategoryItem";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await publicRequest.get("/categories");
        setCategories(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="categories-container">
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </div>
  );
}

export default Categories;
