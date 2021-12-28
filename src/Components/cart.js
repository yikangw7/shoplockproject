import React, { useState } from 'react';
import "../html/style.css";
const productCatalog = require("../config/catalogue.json");

const Cart = () => {

    const [count, setCount] = useState(0);
    const [quantity, setQuantity]=useState(1);
    const [intiliazedFlag, setIntiliazedFlag]=useState(0);



    let cartCopy = JSON.parse(localStorage.getItem("cart"));
    const listingStyle = {
        height: "250px",
        width: "250px"
    }



    var cartItems =[];
    var totalCartItems = 0;
    var cartItem = {
        itemInfo: null,
        itemQuantity: null
    };
    
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
}

    // Grammar Check
    if(totalCartItems === 1){
        totalCartItems = "1 item";
    }
    else{
        totalCartItems += " items";
    }

    

    function updateItem(ID, quant){
        for(let i = 0; i < cartItems.length; i++){
            if(ID === cartItems[i].itemInfo.ID){
                cartItems[i].itemQuantity = quant;
                alert(cartItems[i].itemQuantity);
            }
        }
        setCount(count + 1);
    }

    function setItemQuantity(itemQuantity,element){
        setIntiliazedFlag(intiliazedFlag+1);
        setQuantity(itemQuantity);
        element.itemQuantity = itemQuantity;
        cartItems[0].itemQuantity = itemQuantity;

    }

    var cartDisplayList = cartItems.map((element) =>
        <div>
            <h2>{element.itemInfo.name}</h2>
            <img style={listingStyle} src={element.itemInfo.image}/>
            <p class="listing">
                ${element.itemInfo.MSRP / 100} - {element.itemInfo.quantity} in stock
                <br></br>
                {element.itemQuantity} in cart
            </p>
            <input class="textbox" type="text" id="quantity" name="quantity" onChange={e => setItemQuantity(e.target.value,element)} defaultValue={element.itemQuantity}></input>
            <button  class="smallbutton">Update Item</button>
        </div>
    );

    return (
        <>
            
            <h1>Shopping Cart - {totalCartItems}</h1>
            {cartDisplayList}
            <p>{count}</p>
            <p>qantity is {quantity}</p>
            <button onClick={() => {setCount(count + 1)}} class="smallbutton">Refresh Cart</button>
        </>
    )
}

export default Cart;