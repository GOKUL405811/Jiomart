import React, { useState, useRef, useEffect } from "react";
import "./Grocart.css"; // make sure you create this file

function Grocart() {
  const [showPincode, setShowPincode] = useState(true);
  const lastScrollY = useRef(0);
  

  // ✅ Detect scroll direction
  useEffect(() => {
    const handleWindowScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY.current) {
        // scrolling down → hide pincode
        setShowPincode(false);
      } else {
        // scrolling up → show pincode
        setShowPincode(true);
      }

      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleWindowScroll);
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  return (
    <div className="grocart_page">
      {/* Top Navbar */}
      <div className="jiomart_nav">
        <div className="container nav_content">
          <div className="nav_left">
            <img
              src="images/jiomart.png"
              alt="jio_mart_icon"
              className="nav_logo_img"
            />
            <p>
              <b>JioMart</b>
            </p>
          </div>

          <div className="nav_center">
            <div className="search_container">
              <img
                src="images/search.png"
                alt="search_icon"
                className="search_icon"
              />
              <input
                type="text"
                placeholder="Search In JioMart"
                className="nav_input"
              />
              <img
                src="images/list.png"
                alt="list_icon"
                className="list_icon"
              />
            </div>

            <div className="grocery_div">
              <a href="/grocery">
                <img
                  src="images/grocery.png"
                  alt="grocery"
                  className="grocery_icon"
                />
              </a>
            </div>

            <div className="profile_div">
              <img
                src="images/profile.png"
                alt="profile"
                className="profile_icon"
              />
              <a href="/Signin" className="profile_text">
                <p>Sign In</p>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Pincode */}
      <div className={`pincode ${showPincode ? "show" : "hide"}`}>
        <div className="container">
          <p>
            <b>Scheduled delivery to:</b> ' your pincode '
          </p>
        </div>
      </div>

      {/* Cart Section */}
      <div className="cart_section">
        <h2>My Cart</h2>
        <div className="cart_empty">
          <img
            src="images/cart.png"
            alt="empty cart"
            className="cart_image"
          />
          <h3>Your Cart is Empty!</h3>
          <p>It's a nice day to buy the items you saved for later!</p>
          <a href="/" className="continue_link">
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  );
}

export default Grocart;
