import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";

import PrevArrow from "./PrevArrow";
import NextArrow from "./NextArrow";

import { publicRequest } from "../requestMethods";

import CategoryItem from "./CategoryItem";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1601 },
    items: 5,
  },

  desktop: {
    breakpoint: { max: 1600, min: 1025 },
    items: 3,
  },

  landscapeTablet: {
    breakpoint: { max: 1024, min: 769 },
    items: 3,
  },

  tablet: {
    breakpoint: { max: 768, min: 481 },
    items: 3,
  },

  landscapeMobile: {
    breakpoint: { max: 480, min: 321 },
    items: 2,
  },

  mobile: {
    breakpoint: { max: 320, min: 0 },
    items: 1,
  },
};

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
    <Carousel
      className="categories-container"
      containerClass="container-category"
      customLeftArrow={<PrevArrow />}
      customRightArrow={<NextArrow />}
      itemClass="category-item"
      responsive={responsive}
      sliderClass="category-slider"
      slidesToSlide={1}
    >
      {Array.isArray(categories) &&
        categories.map((item) => <CategoryItem item={item} key={item.id} />)}
    </Carousel>
  );
}

export default Categories;
