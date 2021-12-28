import {Nav, NavLink, NavMenu, NavBtn, NavBtnLink} from './NavbarElements';
  
const Navigation = () => {
    const logoStyle = {
        width: "40px",
        height: "40px"
    }
    const selectedStyle = {
        fontWeight: "bold", 
        backgroundColor:"#007d8d"
    }
    const bigLogoStyle = {
        width: "600px",
        height: "199px"
    }
    return (
      <>
        <div class="banner">
                <center>
                    <a href="/">
                        <img src="Icons/LockBIG.png" style={bigLogoStyle} alt="shoplock logo"/>
                    </a>
                </center>
            </div>
        <Nav>
            <NavLink to='/'>
                <img src="Icons/LockPNG.png" alt='logo / home button' style={logoStyle} activeStyle={selectedStyle}/>
            </NavLink>
            <NavMenu>
                <NavLink to='/shop' activeStyle={selectedStyle}>
                    Shop
                </NavLink>
                <NavLink to='/sale' activeStyle={selectedStyle}>
                    Sale
                </NavLink>
                <NavLink to='/contact-us' activeStyle={selectedStyle}>
                    Contact Us
                </NavLink>
                <NavLink to='/cart' activeStyle={selectedStyle}>
                    Your Cart
                </NavLink>
            </NavMenu>
            <NavBtn>
                <NavBtnLink to='/account'>Account</NavBtnLink>
            </NavBtn>
        </Nav>
      </>
    );
  };
export default Navigation;