import React from 'react';
import Carousel from 'react-multi-carousel';
import { bannerData } from '../constants/data';
import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
};

const Banner = () => {
    return (
        <Carousel
            responsive={responsive}
            swipeable={false}
            draggable={false}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={4000}
            slidesToSlide={1}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
        >
            {bannerData.map((data, index) => (
                <img key={index} className='banner-h' src={data.url} alt='banner' />
            ))}
        </Carousel>
    );
};

export default Banner;
