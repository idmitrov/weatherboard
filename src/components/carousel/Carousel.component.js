import React from 'react';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Carousel.scss';

const carouselDefaults = {
  dots: false,
  arrows: true,
  accessibility: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }
  ]
};

const Carousel = ({ children, ...rest }) => {
  return (
    <Slider {...carouselDefaults} {...rest}>
      {children}
    </Slider>
  );
};

export default Carousel;
