import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { topMeels } from './topMeel'
import { CarouselItem } from './CarouselItem';

export const MultiItemCarousel= () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed: 2000,
        arrows:false,
        responsive: [
        {
            breakpoint: 1024,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
            slidesToShow: 1,
            slidesToScroll: 1
            }
        }
        ]
    };
    
    return (
        <Slider {...settings}>
        {topMeels.map((item, index) => (
            <CarouselItem key={index} image={item.image} title={item.title} />
        ))}
        </Slider>
    );
};


