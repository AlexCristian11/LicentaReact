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
            productId: 10
        },
       
        {
            url: 'https://www.apple.com/v/apple-watch-series-8/c/images/overview/design/design_always_on__d2xu1t2c9bwy_large_2x.jpg',
            productId: 6
        },
        {
            url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.cisco.com%2Fc%2Fdam%2Fen%2Fus%2Fproducts%2Fcollateral%2Fcollaboration-endpoints%2Fheadsets%2Fbang-olufsen-980-ds.docx%2F_jcr_content%2Frenditions%2Fbang-olufsen-980-ds_0.png&f=1&nofb=1&ipt=f963937d177cd96cfc2ae52852ad1b9d47fa1736b4c2a5ce49c8f92d6c735dcb&ipo=images',
            productId: 11
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