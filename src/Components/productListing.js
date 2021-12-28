import React, { useState } from 'react';
import "../html/style.css";
import ReactDom from 'react-dom';
import Popup from 'react-popup';
const productCatalog = require("../config/catalogue.json");

const ProductListing = () => {
    function addToCart(ID, quant){
        for(let product of productCatalog.productList){
            if(ID === product.ID){
                if(quant > product.quantity){
                    alert("You can only add a maximum of "+product.quantity+" items to your cart.");
                    break;
                }
                else{
                    var item = {
                        ID: ID,
                        quantity: parseInt(quant)
                    };
                    addItem(item);
                    alert(localStorage.getItem("cart") + "Added to cart");
                    break;
                }
            }
        }
    }
    
    let [cart, setCart] = useState([]) 
    let localCart = localStorage.getItem("cart");
    const updateItem = (itemID, amount) => {}
    const removeItem = (itemID) => {}
  
    const addItem = (item) => {  
        //create a copy of our cart state, avoid overwritting existing state
        let cartCopy = [...cart];       
        //assuming we have an ID field in our item
        let {ID} = item;      
        //look for item in cart array
        let existingItem = cartCopy.find(cartItem => cartItem.ID == ID);        
        //if item already exists
        if (existingItem) {
            existingItem.quantity += item.quantity //update item
        } else { //if item doesn't exist, simply add it
          cartCopy.push(item)
        }        
        //update app state
        setCart(cartCopy)       
        //make cart a string and store in local space
        let stringCart = JSON.stringify(cartCopy);
        localStorage.setItem("cart", stringCart)    
    }
  
    const listingStyle = {
        height: "250px",
        width: "250px"
    }

    var regularPricedProductList;

    //get total numbrer of products
    // var totalNumberOfProduct = productCatalog.productList.length;
    // var numberOfRows = (totalNumberOfProduct % 3) === 0 ? totalNumberOfProduct / 3 : (totalNumberOfProduct / 3) + 1;

    var productRows = [];
    var productIncludedCount = 0;

    var rowList = {
        left: null,
        center: null,
        right: null
    };
    //assuming 3 products will be displayed every row
    for (let product of productCatalog.productList) {
        //only include product without salePrice
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
                };;
            }
            productIncludedCount++;
        }
    }

    if (productIncludedCount % 3 > 0) {
        productRows.push(rowList);
    }

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
        </>
    )
}
export default ProductListing;
