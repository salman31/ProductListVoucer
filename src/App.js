import React, { Component } from 'react';
import './App.css';
import img1 from './img/img-1.jpg';
import img2 from './img/img-2.jpg';

class ProductInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getVoucher: this.props.sold
    };
  }

  getOneVoucer = ()=>{
    this.setState({getVoucher: this.state.getVoucher + 1})
  }

  render() {
    let widthPink = (this.state.getVoucher/this.props.stock)*100;   
    const soldRange = {
      width: widthPink + "%"      
    };

    let SellIndicator = "";
    if (widthPink === 100) { 
      SellIndicator = "Sold Out";       
    } else if (widthPink >= 80 && widthPink < 100) { 
      SellIndicator = "Selling Out";
    } else { 
      SellIndicator = this.state.getVoucher + " sold";
    }    
      
    return(
      <div className="product-info">
        <div>
          <span className="pi-name">{this.props.name}</span>          
          <span className="pi-rating">&#9733; {this.props.rating}</span>
          {(this.props.discPrice > 0) ? <span className="pi-disc">Disc 50%</span> : ""}
        </div>    
        <div>
          <span className="pi-price">Rp{(this.props.discPrice === 0) ? this.props.normalPrice : this.props.discPrice}</span>
          <span className="pi-pricesline">Rp{(this.props.discPrice === 0) ? this.props.normalPrice : this.props.discPrice}</span>
        </div>
        <div>
          <p className="pi-desc">{this.props.desc}</p>  
        </div>          
        <div className="pi-bottom">
          <span className="pi-sold">          
            {SellIndicator}
            <div className="pi-sindicator">
              <div className="pi-sindicator pi-sindicator__fill" style={soldRange}></div>
            </div>            
          </span>
          {(widthPink < 100) ? <button className="pi-cta" onClick={this.getOneVoucer}>Get Voucher Now</button> : ""}
        </div>  
      </div>      
    );
  }
}

class ProductImage extends Component {
  render() {    
    const imgUrl = this.props.imgUrl;    
    const productImgStyle = {
      backgroundImage: "url(" + imgUrl + ")"      
    };
    return (
      <div className="product-image" style={productImgStyle}></div>
    );
  }
}

class Product extends Component {
  render() {
    const product = this.props.product;        
    return (      
        <div className="product">   
          <div className="product-left">
            <ProductImage imgUrl={product.imgUrl}/>
          </div>
          <div className="product-right">
            <ProductInfo name={product.name} normalPrice={product.normalPrice} discPrice={product.discPrice} desc={product.desc}
              sold={product.sold} stock={product.stock} rating={product.rating} getVoucher={this.props.getVoucher}/>
          </div>                           
        </div>      
    );
  }
}

export default class ListOfProduct extends Component {
  render() {    
    let i = 0;
    const listProduct = [];
    const products = [
      { 
        name: "Mango Pooloza", 
        normalPrice: 30000, 
        discPrice: 15000, 
        desc: "No matter how full you are, there's still plenty of room for dessert. Save some space for our delightful Mango pooloza!", 
        rating: 4.9, 
        sold: 350,
        stock: 400,
        imgUrl: img1
      }, { 
        name: "Fried Calamari", 
        normalPrice: 23900, 
        discPrice: 0, 
        desc: "Fried calamari is a dish in Mediterranean cuisine. It consists of batter-coated, deep fried squid, fried for less than two minutes to prevent toughness.", 
        rating: 4.7, 
        sold: 150,
        stock: 200,
        imgUrl: img2
      }
    ];
      
    products.forEach((product) => {           
      listProduct.push(      
        <div className="product-list" key={i++}>
          <Product product={product}/>
        </div>
      );      
    });

    return (
      <div className="container">          
        {listProduct}         
      </div>
    );
  }
}