import React, { useState } from 'react';
import "../html/style.css";
import Popup from "./popup";
import {Nav, NavLink} from './Navbar/NavbarElements';

const productCatalog = require("../config/catalogue.json");

const ProductListing = () => {
    // Popup state
    const [isOpen, setIsOpen] = useState(false);
    const togglePop = () => {
      setIsOpen(!isOpen);
    }
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const toggleError = () => {
        setIsErrorOpen(!isErrorOpen);
    }

    // Cart
    let cartCopy = JSON.parse(localStorage.getItem("cart"));
    var cartItem = {
        itemInfo: null,
        itemQuantity: null
    };

    for(let product of productCatalog.productList){
        if(cartCopy[cartCopy.length - 1].ID === product.ID){
            cartItem.itemInfo = product;
            cartItem.itemQuantity = cartCopy[cartCopy.length - 1].quantity;
        }
    }

    // Popup data
    var popImage = <img class="popupimage" src={cartItem.itemInfo.image}/>;
    var popText = <p>{cartItem.itemQuantity}x {cartItem.itemInfo.name} added to cart</p>;
    var popPrice = <p>${cartItem.itemQuantity * (cartItem.itemInfo.MSRP / 100)} total</p>;

    function addToCart(ID, quant){
        for(let product of productCatalog.productList){
            if(ID === product.ID){
                if(quant > product.quantity){
                    toggleError();
                    break;
                }
                else{
                    var item = {
                        ID: ID,
                        quantity: parseInt(quant)
                    };
                    addItem(item);
                    togglePop();
                    break;
                }
            }
        }
    }
    
    let [cart, setCart] = useState([]); 
    function addItem(item) {  
        let cartCopy = [...cart];       
        let {ID} = item;      
        let existingItem = cartCopy.find(cartItem => cartItem.ID == ID);        
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } 
        else {
          cartCopy.push(item);
        }        
        setCart(cartCopy);  
        let stringCart = JSON.stringify(cartCopy);
        localStorage.setItem("cart", stringCart);    
    }
  
    const listingStyle = {
        height: "250px",
        width: "250px"
    }

    // Process JSON data into HTML 
    var productRows = [];
    var productIncludedCount = 0;

    var rowList = {
        left: null,
        center: null,
        right: null
    };
    // assuming 3 products will be displayed every row
    for (let product of productCatalog.productList) {
        // only include product without salePrice
        if (product.salePrice == null) {

            if (productIncludedCount % 3 === 0)
                rowList.left = product;
            if (productIncludedCount % 3 === 1)
                rowList.center = product;
            if (productIncludedCount % 3 === 2) {
                rowList.right = product;
                productRows.push(rowList);

                //reset variable rowList
                rowList = {
                    left: null,
                    center: null,
                    right: null
                };
            }
            productIncludedCount++;
        }
    }

    if (productIncludedCount % 3 > 0) 
        productRows.push(rowList);

    var productDisplayList = productRows.map((element) =>
        <div class="row">
            {element.left &&
                <div class="column">
                    <center>
                        <h2>{element.left.name}</h2>
                        <img style={listingStyle} src={element.left.image}/>
                        <p class="listing">${element.left.MSRP / 100} - 10 in stock</p>
                        <input class="textbox" type="text" id="quantity" name="quantity" defaultValue="1"></input>
                        <button onClick={() => {addToCart(element.left.ID, document.getElementById("quantity").value)}} class="smallbutton">Add to Cart</button>
                    </center>
                </div>
            }
            {element.center &&
                <div class="column">
                    <center>
                        <h2>{element.center.name}</h2>
                        <img style={listingStyle} src={element.center.image}/>
                        <p class="listing">${element.center.MSRP / 100} - 25 in stock</p>
                        <input class="textbox" type="text" id="quantity2" name="quantity2" defaultValue="1"></input>
                        <button onClick={() => {addToCart(element.center.ID, document.getElementById("quantity2").value)}} class="smallbutton">Add to Cart</button>
                    </center>
                </div>
            }
            {element.right &&
                <div class="column">
                    <center>
                        <h2>{element.right.name}</h2>
                        <img style={listingStyle} src={element.right.image}/>
                        <p class="listing">${element.right.MSRP / 100} - 2 in stock</p>
                        <input class="textbox" type="text" id="quantity3" name="quantity3" defaultValue="1"></input>
                        <button onClick={() => {addToCart(element.right.ID, document.getElementById("quantity3").value)}} class="smallbutton">Add to Cart</button>
                    </center>
                </div>
            }
        </div>
    );

    return (
        <>
            <h1>Popular Items</h1>

            {productDisplayList}
            {isOpen && <Popup
                content={<>
                    <h2>Cart Notification</h2>
                    <center>
                        {popImage}
                        {popText}
                        {popPrice}
                        <Nav>
                        <NavLink to='/cart'> 
                            Cart
                        </NavLink>
                        <NavLink to='/cart'> 
                            Checkout
                        </NavLink>
                        </Nav>
                    </center>
                </>}
                handleClose={togglePop}
            />}
            {isErrorOpen && <Popup
                content={<>
                    <h2>ERROR</h2>
                    <center>
                        <p>There not enough items in stock.</p>
                    </center>
                </>}
                handleClose={toggleError}
            />}
        </>
    )
}
export default ProductListing;
