import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import PrevArrow from "./PrevArrow";
import NextArrow from "./NextArrow";

import { publicRequest } from "../requestMethods";

function HeroCarousel() {
  const [sliderItems, setSliderItems] = useState([]);

  useEffect(() => {
    const fetchSliderItems = async () => {
      try {
        const res = await publicRequest.get("/sliderItems");
        setSliderItems(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSliderItems();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {sliderItems.map((item) => (
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
      </Slider>
    </div>
  );
}

export default HeroCarousel;
