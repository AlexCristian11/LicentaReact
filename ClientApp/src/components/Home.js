import React, { Component, useEffect, useState, useContext } from 'react';
import Product from './Product';
import { Link } from 'react-router-dom';
import './Home.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { DarkModeContext } from '../DarkModeContext';
import Filters from './Filters';

const ImageSlider = () => {

    const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

    
    const images = [
        {
            url: 'https://www.apple.com/v/macbook-pro-13/p/images/overview/hero_endframe__bsza6x4fldiq_large_2x.jpg',
            productId: 3
        },
        {
            url: 'https://www.apple.com/v/iphone-14-pro/h/images/key-features/hero/hero_deep_purple__dlhl8s8j6wk2_large_2x.jpg',
            productId: 1
        },
       
        {
            url: 'https://www.apple.com/v/apple-watch-series-8/c/images/overview/design/design_always_on__d2xu1t2c9bwy_large_2x.jpg',
            productId: 6
        }
    ];

    const CustomPrevArrow = (props) => {
        const { onClick } = props;
        return <div className="slick-arrow slick-prev" onClick={onClick} />;
    };

    const CustomNextArrow = (props) => {
        const { onClick } = props;
        return <div className="slick-arrow slick-next" onClick={onClick} />;
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />
    };

    

    return (
        <div className={`slider ${isDarkMode ? 'dark-mode-slider' : ''}`}>
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index}>
                        <Link to={`api/products/${image.productId}`}>
                            <img src={image.url} alt={`Slide ${index + 1}`} />
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

const Home = () => {

    const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
    const [selectedFilter, setSelectedFilter] = useState('');

    const handleFilterClick = (categoryId) => {
        if (selectedFilter !== '' && categoryId !== selectedFilter) {
            setSelectedFilter('');
        } else {
            setSelectedFilter(categoryId === selectedFilter ? '' : categoryId);
        }
        
        console.log(selectedFilter);
    };

    return (
        <div className={`container-home ${isDarkMode ? 'dark-mode' : ''}`}>
            <ImageSlider />
            <Filters onFilterClick={handleFilterClick} selectedFilter={selectedFilter} />
            <div className="productsList">
                <Product className="product" categoryId={selectedFilter} />
            </div>
        </div>
    );
}

    export default Home;