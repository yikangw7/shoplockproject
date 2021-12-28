import React, { useState } from 'react';
import ProductListing from './productsListing';



const pictureStyle = {
    width: "250px",
    height: "250px"
}

const bannerStyle = {
    width: "600",
    height: "199"
}

const accountStype = {
    width: "24px",
    height: "24px"
}

const cartStype = {
    width: "24px",
    height: "24px"
}


const searchStype = {
    width: "15px",
    height: "15px"
}

const infoStyle = {
    color: "white",
    "font-size": "15px"
}




const Store = () => {

    var i;
    i = 0;

    return (
        <>
            <div class="banner">
                <center>
                    <a href="/">
                        <img src="Icons/LockBIG.png" alt="shoplock logo" style={bannerStyle} />
                    </a>
                </center>
            </div>
            <div class="toolbar">
                <a href="/" class="button">HOME</a>
                <div class="dropdown">
                    <button class="button">SHOP</button>
                    <div class="dropdown-content">
                        <a href="vg.html">Video Games</a>
                        <a href="fhi.html">Furniture & Home Items</a>
                        <a href="so.html">Sports & Outdoors</a>
                        <a href="mi.html">Miscellaneous Items</a>
                    </div>
                </div>
                <a href="sale.html" class="button">SALE</a>
                <a href="contact.html" class="button">SUPPORT</a>
                <div class="rightside">
                    <a href="account.html">
                        <button class="iconbutton"><img src="Icons/acc.png" alt="Account" style={accountStype}></img></button>
                    </a>
                    <a href="cart.html">
                        <button class="iconbutton"><img src="Icons/cart.png" alt="Cart" style={cartStype}></img></button>
                    </a>
                </div>
                <div class="search-container">
                    <form action="/action_page.php">
                        <input type="text" placeholder="Search..." name="search" />
                        <button type="submit"><img src="Icons/magnify.png" alt="search" style={searchStype}></img></button>
                    </form>
                </div>
            </div>

            <ProductListing />

            <div class="gray">
                <h1>Featured Items</h1>
                <div class="row">
                    <div class="column2">
                        <center>
                            <h2>Fortnite Chug Jug</h2>
                            <img src="Items/chugjug.png" style={pictureStyle} />
                            <p class="listing"><em>$80</em> $69 - 13 in stock</p>
                            <button class="smallbutton">Add to Cart</button>
                        </center>
                    </div>
                    <div class="column2">
                        <center>
                            <h2>Neon Gaming Lamp</h2>
                            <img src="Items/gaminglamp.png" style={pictureStyle} />
                            <p class="listing"><em>$40</em> $30 - 47 in stock</p>
                            <button class="smallbutton">Add to Cart</button>
                        </center>
                    </div>
                    <div class="column2">
                        <center>
                            <h2>Apple Stickers - Set of 4</h2>
                            <img src="Items/applestk.jpg" style={pictureStyle} />
                            <p class="listing"><em>$1,000</em> $5 - 15 in stock</p>
                            <button class="smallbutton">Add to Cart</button>
                        </center>
                    </div>
                    <div class="column2">
                        <center>
                            <h2>Gaming Face Mask</h2>
                            <img src="Items/gmask.png" style={pictureStyle} />
                            <p class="listing"><em>$200</em> $199 - 1,341 in stock</p>
                            <button class="smallbutton">Add to Cart</button>
                        </center>
                    </div>
                </div>
            </div>
            <div class="subscribe">
                <h2>Subscribe to our newsletter!</h2>
                <div class="wrap">
                    <input type="text" placeholder="Email address" name="mail" class="mailbar" required />
                    <input type="submit" class="smallbutton" value="Subscribe" />
                </div>
            </div>
            <div class="info">
                <div class="row">
                    <div class="column3">
                        <h3>Customer Support</h3>
                        <p style={infoStyle}>
                            Contact us by email: support@shoplock.com <br /><br />
                            Contact us by phone: 555-666-7777 <br /><br />
                            Follow our Twitter: @Shoplock <br /><br />
                            Follow our Instagram: @Shoplock <br /><br />
                        </p>
                    </div>
                    <div class="column3">
                        <h3>We Buy Your Items!</h3>
                        <p style={infoStyle}>
                            Trading cards purchased for 60% of market price <br /><br />
                            Video games purchased for 50% of retail price <br /><br />
                            Furniture prices can be negotiated <br /><br />
                            Sports collectible prices can be negotiated <br /><br />
                        </p>
                    </div>
                    <div class="column3">
                        <h3>Now Hiring</h3>
                        <p style={infoStyle}>
                            In need of: <br /><br />
                            Backend Developer<br />
                            Web Developer<br />
                            Full Stack Developer<br />
                            Support Representative<br />
                            Graphic Designer<br />
                            Project Manager<br /><br />
                            Call our support line @ 555-666-7777 for more information!
                        </p>
                    </div>
                    <div class="column3">
                        <h3>Shoplock Toronto</h3>
                        <p style={infoStyle}>
                            Open from 9AM - 8PM every day of the week! <br /><br />
                            77 Legitimate Avenue<br /><br />
                            Toronto, ON 1Z1 Z1Z<br /><br />
                            Canada<br /><br />
                        </p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Store;
