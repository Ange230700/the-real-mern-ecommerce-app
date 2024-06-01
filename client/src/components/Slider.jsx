import { useState } from "react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { sliderItems } from "../data";

function Slider() {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <div className="slider-container">
      <button
        type="button"
        aria-label="left arrow"
        className="slider-arrow"
        direction="left"
        onClick={() => handleClick("left")}
      >
        <ArrowLeftOutlined />
      </button>
      <div className="slider-wrapper">
        {sliderItems.map((item) => (
          <div className="slider-slide" key={item.id}>
            <div className="slider-img-container">
              <img className="slider-image" src={item.img} alt="slider pic" />
            </div>
            <div className="slider-info-container">
              <h1 className="slider-title">{item.title}</h1>
              <p className="slider-desc">{item.desc}</p>
              <button type="button" className="slider-button">
                SHOW NOW
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        aria-label="right arrow"
        className="slider-arrow"
        direction="right"
        onClick={() => handleClick("right")}
      >
        <ArrowRightOutlined />
      </button>
    </div>
  );
}

export default Slider;
