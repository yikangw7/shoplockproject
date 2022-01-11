import React, { useState } from 'react';
import "../html/style.css";
import Popup from "./popup";
const productCatalog = require("../config/catalogue.json");

const Cart = () => {
    const [intiliazedFlag, setIntiliazedFlag]=useState(0);

    // Popup Error
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const toggleError = () => {
        setIsErrorOpen(!isErrorOpen);
    }

    // Cart
    let cartCopy = JSON.parse(localStorage.getItem("cart"));
    const listingStyle = {
        height: "250px",
        width: "250px"
    }
    var cartItems = [];
    var totalCartItems = 0;
    var cartItem = {
        itemInfo: null,
        itemQuantity: null
    };
    var cartCost = 0;
    
    if(intiliazedFlag == 0){
        for(let i = 0; i < cartCopy.length; i++){
            for(let product of productCatalog.productList){
                if(cartCopy[i].ID === product.ID){
                    cartItem.itemInfo = product;
                    cartItem.itemQuantity = cartCopy[i].quantity;
                    totalCartItems += cartItem.itemQuantity;
                    cartItems.push(cartItem);
                    var cartItem = {
                        itemInfo: null,
                        itemQuantity: null
                    };
                }
            }
        }
        for (let i = 0; i < cartItems.length; i++){
            cartCost += cartItems[i].itemQuantity * (cartItems[i].itemInfo.MSRP / 100);
        }
    }

    // Grammar Check
    if(totalCartItems === 1){
        totalCartItems = "1 item";
    }
    else{
        totalCartItems += " items";
    }

    function updateItem(ID, quant){
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
                    window.location.reload();
                    break;
                }
            }
        }
    }

    let [cart, setCart] = useState([]); 
    function addItem(item) {  
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

    var cartDisplayList = cartItems.map((element) =>
        <div class="cartrow">
            <div class="cartitem">
                <center>
                    <h2>{element.itemInfo.name}</h2>
                    <img style={listingStyle} src={element.itemInfo.image}/>
                </center>
            </div>
            <div class="cartiteminfo">
                <p class="iteminfo">
                    <br></br>
                    <br></br>
                    This is a placeholder for the item description of this item. This will be implemented
                    <br></br>
                    at a later time. As of now, this item does not have a specific description. However, for 
                    <br></br>
                    style purposes, this text will need to exist simply to take up space.
                    <br></br>
                    <br></br>
                    ${element.itemInfo.MSRP / 100} - {element.itemInfo.quantity} in stock
                    <br></br>
                    {element.itemQuantity} in cart
                </p>
            <input class="textbox" type="text" id="quantity" name="quantity" defaultValue={element.itemQuantity}></input>
            <button class="smallbutton" onClick={() => {updateItem(element.itemInfo.ID, document.getElementById("quantity").value)}}>Update Item</button>
            </div>
        </div>
    );

    return (
        <>
            <h1>Shopping Cart - {totalCartItems}</h1>
            {cartDisplayList}
            <div class="cartbottom">
                <center>
                    <p>Total cost: $    {cartCost}</p>
                </center>
            </div>
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

export default Cart;