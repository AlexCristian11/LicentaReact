import React, { useState } from 'react';
import './Filters.css';

const Filters = ({ onFilterClick, selectedFilter }) => {



    return (
        <div className="filters">
            <div className={`filter ${selectedFilter === 1 ? 'selected' : ''}`} onClick={() => onFilterClick(1)}>
                <img src="https://cdn11.bigcommerce.com/s-p8i5esyy64/images/stencil/2560w/products/1930/8223/iphone-13-pro-max-graphite-select__87547.1635471241.png?c=2"/>
                <h4>Telefoane</h4>
            </div>
            <div className={`filter ${selectedFilter === 2 ? 'selected' : ''}`} onClick={() => onFilterClick(2)}>
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fphotos5.appleinsider.com%2Fprice_guide%2Fm1-macbook-pro-pp-header.png&f=1&nofb=1&ipt=7e780e7a9461ab78ffc18c41eff8c559c8b80edac19651aa5551a58c4b74cf3d&ipo=images"/>
                <h4>Laptopuri</h4>
            </div>
            <div className={`filter ${selectedFilter === 3 ? 'selected' : ''}`} onClick={() => onFilterClick(3)}>
                <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F5%2FIPad-PNG-Pic.png&f=1&nofb=1&ipt=f38e9b61d2acb25c0c6b4c3349ef23179d08b455df96078af2d24c2049a1ba4a&ipo=images"/>
                <h4>Tablete</h4>
            </div>
            <div className={`filter ${selectedFilter === 4 ? 'selected' : ''}`} onClick={() => onFilterClick(4)}>
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F1956%2F9041%2Fproducts%2Fairpods_pro.png%3Fv%3D1572876659&f=1&nofb=1&ipt=04ab2fc1019397bafd18d83b9a133d428fb761a52e39d1a2bb4ae45a08ec5d01&ipo=images"/>
                <h4>Accesorii</h4>
            </div>
            <div className={`filter ${selectedFilter === 5 ? 'selected' : ''}`} onClick={() => onFilterClick(5)}>
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fnexusherning.dk%2Fwp-content%2Fuploads%2F2022%2F01%2FBeolab-90-black.png&f=1&nofb=1&ipt=c8c3ea09c24b5c494cfbf36f681ec010b72c1afe1d3a5b11ccc6de704c1b9ec8&ipo=images"/>
                <h4>Audio</h4>
            </div>
        </div>
    )
}

export default Filters;