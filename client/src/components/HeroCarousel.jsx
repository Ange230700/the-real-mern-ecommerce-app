/*
  eslint-disable no-var
*/

/*
  eslint-disable prefer-const
*/

import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";

import PrevArrow from "./PrevArrow";
import NextArrow from "./NextArrow";

import { publicRequest } from "../requestMethods";

function HeroCarousel() {
  const sliderRef = useRef(null);

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow onClick={previous} />,
    nextArrow: <NextArrow onClick={next} />,
  };

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
    <div className="slider-container">
      <Slider ref={sliderRef} {...settings}>
        {Array.isArray(sliderItems) &&
          sliderItems.map((item) => (
            <div className="slider-slide" key={item.id}>
              <div className="slider-img-container">
                <img
                  className="slider-image"
                  src={item.image}
                  alt="slider pic"
                />
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
