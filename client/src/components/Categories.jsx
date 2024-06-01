import { categories } from "../data";
import CategoryItem from "./CategoryItem";

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
