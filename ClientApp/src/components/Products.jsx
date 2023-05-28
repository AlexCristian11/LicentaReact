import React, { Component } from 'react';
import './Products.css';
import Product from './Product';

function Products(props) {
    return (
        <div className="productsList">
            <Product className="product" price="1250 Lei" name="Airpods Pro 2" image="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=1144&hei=1144&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1572990352299" />
            <Product className="product" price="6200 Lei" name="Iphone 13 Pro Max" image="https://cdn11.bigcommerce.com/s-p8i5esyy64/images/stencil/2560w/products/1930/8223/iphone-13-pro-max-graphite-select__87547.1635471241.png?c=2" />
            <Product className="product" price="9875.99 Lei" name="MacBook Pro" image="https://www.bhphotovideo.com/images/images2500x2500/apple_z11b_myd8_05_bh_13_3_macbook_pro_with_1604815.jpg" />
            <Product className="product" price="39.89 Lei" name="Cablu incarcare" image="https://www.mobiledirect.ro/foto/cablu-incarcare-si-transfer-date-type-c-to-lightning---baseus-pd-20w-black-1m-catlwj-01_110062982931257_large.jpg" />
            <Product className="product" price="3570.75 Lei" name="Apple Watch 8" image="https://www.apple.com/newsroom/images/product/os/watchos/standard/apple_wwdc21-watchos8_hero_06072021_big.jpg.large_2x.jpg" />
        </div>
    )
}

export default Products;