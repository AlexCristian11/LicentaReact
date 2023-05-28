import React, { Component } from 'react';
import './Product.css';
import { BsFillCartFill } from 'react-icons/bs'

function Product(props) {
        return (
            <div>
                <div className="product"> 
                    <img src={props.image} />
                    <h5>{props.name}</h5>
                    <div className="details">
                        <p>{ props.price }</p>
                        <div className="icon">
                            <BsFillCartFill id="icon" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

export default Product