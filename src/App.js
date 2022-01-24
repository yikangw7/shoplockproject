import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Components/home';
import Shop from './Components/shop';
import Sale from './Components/sale';
import Contact from './Components/contact';
import Cart from './Components/cart';
import Account from './Components/account';
import Navigation from './Components/Navbar/Navbar'

function App() {
  const infoStyle = {
    color: "white",
    "font-size": "15px"
  }

  var cart = {
      items: null
  }

  var propTest = "test";

  return (
    <Router>
      <div className="App">
        <Navigation />
        <Switch>
          <Route path='/shop' component={Shop}/> 
          <Route path='/sale' component={Sale}/> 
          <Route path='/contact-us' component={Contact}/> 
          <Route path='/cart' component={Cart}/> 
          <Route path='/account' component={Account}/> 
          <Route path='/' render={(props) => (<Home {... props} cart={propTest}/>)}/>   
        </Switch>
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
    </Router>
  );
}

export default App;
