import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";

import PrevArrow from "./PrevArrow";
import NextArrow from "./NextArrow";

import { publicRequest } from "../requestMethods";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1601 },
    items: 1,
  },

  desktop: {
    breakpoint: { max: 1600, min: 1025 },
    items: 1,
  },

  landscapeTablet: {
    breakpoint: { max: 1024, min: 769 },
    items: 1,
  },

  tablet: {
    breakpoint: { max: 768, min: 481 },
    items: 1,
  },

  landscapeMobile: {
    breakpoint: { max: 480, min: 321 },
    items: 1,
  },

  mobile: {
    breakpoint: { max: 320, min: 0 },
    items: 1,
  },
};

function HeroCarousel() {
  const [sliderItems, setSliderItems] = useState([]);

  useEffect(() => {
    const fetchSliderItems = async () => {
      try {
        const res = await publicRequest.get("/slider_items");
        setSliderItems(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSliderItems();
  }, []);

  return (
    <Carousel
      className="slider-container"
      containerClass="container"
      customLeftArrow={<PrevArrow />}
      customRightArrow={<NextArrow />}
      itemClass="item"
      responsive={responsive}
      sliderClass="slider"
      slidesToSlide={1}
    >
      {Array.isArray(sliderItems) &&
        sliderItems.map((item) => (
          <div className="slider-slide" key={item.id}>
            <div className="slider-img-container">
              <img className="slider-image" src={item.image} alt="slider pic" />
            </div>
            <div className="slider-info-container">
              <h1 className="slider-title">{item.title}</h1>
              <button type="button" className="slider-button">
                SHOW NOW
              </button>
            </div>
          </div>
        ))}
    </Carousel>
  );
}

export default HeroCarousel;
