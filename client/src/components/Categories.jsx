import CategoryItem from "./CategoryItem";

import { categories } from "../data";

function Categories() {
  return (
    <div className="categories-container">
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </div>
  );
}

export default Categories;
