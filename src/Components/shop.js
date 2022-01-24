import React, { useState } from 'react';
import Popup from "./popup";
import "../html/style.css";
import {Nav, NavLink} from './Navbar/NavbarElements';

const productCatalog = require("../config/catalogue.json");

const Shop = () => {
    const listingStyle = {
        height: "150px",
        width: "150px"
    }

    // Popup state
    const [isOpen, setIsOpen] = useState(false);
    const togglePop = () => {
      setIsOpen(!isOpen);
    }
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const toggleError = () => {
        setIsErrorOpen(!isErrorOpen);
    }
    
    // cart item 
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

    // Add to cart function
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

    // Put the item in the cart
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

    // State of sort method
    const [sortMethod, setSortMethod] = useState("1");
    function changeSortMethod(methodID){
        setSortMethod(methodID);
    }

    // Comparison functions
    function alphabeticalCompare(item1, item2){
        var comp = item1.name.localeCompare(item2.name);
        if (comp < 0){
            return true;
        }
        else {
            return false;
        }
    }
    function alphabeticalCompareReverse(item1, item2){
        var comp = item1.name.localeCompare(item2.name);
        if (comp > 0){
            return true;
        }
        else {
            return false;
        }
    }
    function priceCompare(item1, item2){
        return item1.MSRP < item2.MSRP;
    }
    function priceCompareReverse(item1, item2){
        return item1.MSRP > item2.MSRP;
    }

    // merges two sorted arrays, using a custom comparator function
    function merge(left, right, comparator) {
        var arr = [];
        while (left.length && right.length) {
            if (comparator(left[0], right[0])) {
                arr.push(left.shift());
            } 
            else {
                arr.push(right.shift());
            }
        }
        return [ ...arr, ...left, ...right ];
    }
    
    // merge sort function to sort items, using a custom comparator function
    function mergeSort(items, comparator) {
        const half = items.length / 2;
        if(items.length < 2){
          return items;
        }
        const left = items.splice(0, half);
        return merge(mergeSort(left, comparator), mergeSort(items, comparator), comparator);
    }

    var listOfProducts = [];
    for(let product of productCatalog.productList){
        listOfProducts.push(product);
    }

    if(sortMethod == "1"){
        listOfProducts = mergeSort(listOfProducts, alphabeticalCompare);
    }
    else if(sortMethod == "2"){
        listOfProducts = mergeSort(listOfProducts, alphabeticalCompareReverse);
    }
    else if(sortMethod == "3"){
        listOfProducts = mergeSort(listOfProducts, priceCompare);
    }
    else if(sortMethod == "4"){
        listOfProducts = mergeSort(listOfProducts, priceCompareReverse);
    }

    function updateSort(ID){
        changeSortMethod(ID);
    }

    // Create & organize the webpage

    var rowList = {
        itemOne: null,
        itemTwo: null,
        itemThree: null,
        itemFour: null
    };
    var productIncludedCount = 0;
    var productRows = [];

    for(let product of listOfProducts){
        if (productIncludedCount % 4 == 0)
            rowList.itemOne = product;
        if (productIncludedCount % 4 == 1)
            rowList.itemTwo = product;
        if (productIncludedCount % 4 == 2)
            rowList.itemThree = product;
        if (productIncludedCount % 4 == 3) {
            rowList.itemFour = product;
            productRows.push(rowList);        
            rowList = {
                itemOne: null,
                itemTwo: null,
                itemThree: null,
                itemFour: null
            };
        }
        productIncludedCount++;
    }

    if (productIncludedCount % 4 > 0)
        productRows.push(rowList);
    
    var productDisplayList = productRows.map((element) =>
        <div class="row">
            {element.itemOne &&
                <div class="column6">
                    <center>
                        <h2>{element.itemOne.name}</h2>
                        <img style={listingStyle} src={element.itemOne.image}/>
                        <p class="listing">${element.itemOne.MSRP / 100} - 10 in stock</p>
                        <input class="textbox" type="text" id="quantity" name="quantity" defaultValue="1"></input>
                        <button onClick={() => {addToCart(element.itemOne.ID, document.getElementById("quantity").value)}} class="smallbutton">Add to Cart</button>
                    </center>
                </div>
            }
            {element.itemTwo &&
                <div class="column6">
                    <center>
                        <h2>{element.itemTwo.name}</h2>
                        <img style={listingStyle} src={element.itemTwo.image}/>
                        <p class="listing">${element.itemTwo.MSRP / 100} - 25 in stock</p>
                        <input class="textbox" type="text" id="quantity2" name="quantity2" defaultValue="1"></input>
                        <button onClick={() => {addToCart(element.itemTwo.ID, document.getElementById("quantity2").value)}} class="smallbutton">Add to Cart</button>
                    </center>
                </div>
            }
            {element.itemThree &&
                <div class="column6">
                    <center>
                        <h2>{element.itemThree.name}</h2>
                        <img style={listingStyle} src={element.itemThree.image}/>
                        <p class="listing">${element.itemThree.MSRP / 100} - 2 in stock</p>
                        <input class="textbox" type="text" id="quantity3" name="quantity3" defaultValue="1"></input>
                        <button onClick={() => {addToCart(element.itemThree.ID, document.getElementById("quantity3").value)}} class="smallbutton">Add to Cart</button>
                    </center>
                </div>
            }
            {element.itemFour &&
                <div class="column6">
                    <center>
                        <h2>{element.itemFour.name}</h2>
                        <img style={listingStyle} src={element.itemFour.image}/>
                        <p class="listing">${element.itemFour.MSRP / 100} - 2 in stock</p>
                        <input class="textbox" type="text" id="quantity3" name="quantity3" defaultValue="1"></input>
                        <button onClick={() => {addToCart(element.itemFour.ID, document.getElementById("quantity3").value)}} class="smallbutton">Add to Cart</button>
                    </center>
                </div>
            }
        </div>
    );

    return (
        <>
            <h1>Shop</h1>
            <div>
                
                <select name="sort" class="sort" id="sort" onChange={() => {updateSort(document.getElementById("sort").value)}}>
                    <option value="1">Alphabetically, A-Z</option>
                    <option value="2">Alphabetically, Z-A</option>
                    <option value="3">Price, Low to High</option>
                    <option value="4">Price, High to Low</option>
                </select>
                <p class="sort">Sort:</p>
            </div>
            <br></br>
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

export default Shop;