import React, { useState } from 'react';
import ProductListing from './productListing';

const pictureStyle = {
    width: "250px",
    height: "250px"
}

const Home = props => {
    var i;
    i = 0;

    return (
        <>
            <ProductListing />

            <div class="gray">
                <h1>Featured Items</h1>
                <h2>{props.cart}</h2>
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
        </>
        
    )
}

export default Home;
