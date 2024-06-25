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
  let sliderRef = useRef(null);

  const next = () => {
    sliderRef.slickNext();
  };

  const previous = () => {
    sliderRef.slickPrev();
  };

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
      <Slider
        className="slider-wrapper"
        ref={(slider) => {
          sliderRef = slider;
        }}
        {...settings}
      >
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
      <div style={{ textAlign: "center" }}>
        <PrevArrow previous={previous} />
        <NextArrow next={next} />
      </div>
    </div>
  );
}

export default HeroCarousel;
