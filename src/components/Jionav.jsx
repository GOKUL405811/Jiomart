import React, { useRef, useState, useEffect } from "react";

function Jionav() {
  const galleryRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showPincode, setShowPincode] = useState(true);
  const [activeMenu, setActiveMenu] = useState(""); // track active item
  const [showShoppingList, setShowShoppingList] = useState(false); // shopping list modal
  const lastScrollY = useRef(0);

  /* ---------- helpers for SPA navigation without full reload ---------- */
  const pathToKey = (path) => {
    const p = (path || "").replace(/\/+$/g, ""); // remove trailing slash
    switch (p.toLowerCase()) {
      case "":
      case "/":
        return "mobiles";
      case "/electronis":
        return "electronics";
      case "/homecycle":
        return "home";
      case "/fashion":
        return "fashion";
      case "/grocart":
        return "grocart";
      case "/signin":
        return "signin";
      default:
        return "";
    }
  };

  const handleNavClick = (e, path, key) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return; // allow new tab
    e.preventDefault();
    if (key) setActiveMenu(key);

    if (window.location.pathname !== path) {
      window.history.pushState({}, "", path);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  };

  /* ---------- gallery controls ---------- */
  const scrollLeft = () => {
    if (!galleryRef.current) return;
    galleryRef.current.scrollBy({ left: -370, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (!galleryRef.current) return;
    galleryRef.current.scrollBy({ left: 370, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (!galleryRef.current) return;
    const index = Math.round(galleryRef.current.scrollLeft / 370);
    setActiveIndex(index);
  };

  /* ---------- pincode show/hide on scroll ---------- */
  useEffect(() => {
    const handleWindowScroll = () => {
      const currentScroll = window.scrollY;
      setShowPincode(currentScroll <= lastScrollY.current);
      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleWindowScroll);
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  /* ---------- initialise active menu ---------- */
  useEffect(() => {
    setActiveMenu(pathToKey(window.location.pathname));
    const onPop = () => setActiveMenu(pathToKey(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return (
    <div className="full_nav">
      {/* Top Navbar */}
      <div className="jiomart_nav">
        <div className="container nav_content">
          <div className="nav_left">
            <img src="images/jiomart.png" alt="jio_mart_icon" className="nav_logo_img" />
            <p>
              <b>JioMart</b>
            </p>
          </div>

          <div className="nav_center">
            <div className="search_container">
              <img src="images/search.png" alt="search_icon" className="search_icon" />
              <input type="text" placeholder="Search In JioMart" className="nav_input" />
              <img
                src="images/list.png"
                alt="list_icon"
                className="list_icon"
                onClick={() => setShowShoppingList(true)}
              />
            </div>

            <div className="grocery_div">
              <a
                href="/Grocart"
                onClick={(e) => handleNavClick(e, "/Grocart", "grocart")}
                aria-label="Grocart"
              >
                <img src="images/grocery.png" alt="grocery" className="grocery_icon" />
              </a>
            </div>

            <div className="profile_div">
              <img src="images/profile.png" alt="profile" className="profile_icon" />
              <a
                href="/Signin"
                className="profile_text"
                onClick={(e) => handleNavClick(e, "/Signin", "signin")}
              >
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

      {/* Item Nav */}
      <div className={`item_mainnav ${showPincode ? "down" : "up"}`}>
        <div className="items_nav_container">
          <div className="items_nav arrow">
            <img src="images/back.png" alt="back" />
          </div>

          {/* Mobiles */}
          <div
            className={`items_nav ${activeMenu === "mobiles" ? "active" : ""}`}
            onClick={() => setActiveMenu("mobiles")}
          >
            <a href="/" onClick={(e) => handleNavClick(e, "/", "mobiles")}>
              <img src="images/phones.jpg" alt="phone" />
              <p>Mobiles</p>
            </a>
          </div>

          {/* Electronics */}
          <div
            className={`items_nav ${activeMenu === "electronics" ? "active" : ""}`}
            onClick={() => setActiveMenu("electronics")}
          >
            <a
              href="/Electronis"
              onClick={(e) => handleNavClick(e, "/Electronis", "electronics")}
            >
              <img src="images/electronics.jpg" alt="electronics" />
              <p>Electronics</p>
            </a>
          </div>

          {/* Home */}
          <div
            className={`items_nav ${activeMenu === "home" ? "active" : ""}`}
            onClick={() => setActiveMenu("home")}
          >
            <a href="/Homecycle" onClick={(e) => handleNavClick(e, "/Homecycle", "home")}>
              <img src="images/sofa.jpg" alt="sofa" />
              <p>Home & Lifestyle</p>
            </a>
          </div>

          {/* Fashion */}
          <div
            className={`items_nav ${activeMenu === "fashion" ? "active" : ""}`}
            onClick={() => setActiveMenu("fashion")}
          >
            <a href="/Fashion" onClick={(e) => handleNavClick(e, "/Fashion", "fashion")}>
              <img src="images/fation.jpg" alt="fashion" />
              <p>Fashion</p>
            </a>
          </div>

          <div className="items_nav arrow">
            <img src="images/next.png" alt="next" />
          </div>
        </div>
      </div>

      {/* Poster */}
      <div className="jioposter">
        <div className="container">
          <img src="images/jioposter.png" alt="Jio Poster" />
        </div>
      </div>

      {/* Display items */}
      <div className="display_items">
        <div className="display_items_wrapper">
          <img
            src="images/back.png"
            alt="back"
            className="display_items_icon left"
            onClick={scrollLeft}
          />

          <div className="display_items_gallery" ref={galleryRef} onScroll={handleScroll}>
            <img src="images/display1.jpg" alt="1" />
            <img src="images/display2.jpg" alt="2" />
            <img src="images/display3.jpg" alt="3" />
            <img src="images/display4.jpg" alt="4" />
          </div>

          <img
            src="images/next.png"
            alt="next"
            className="display_items_icon right"
            onClick={scrollRight}
          />
        </div>

        <div className="carousel_dots">
          {[0, 1].map((i) => (
            <span key={i} className={`dot ${i === activeIndex ? "active" : ""}`} />
          ))}
        </div>
      </div>

      {/* Offer Poster */}
      <div className="offerposter">
        <div className="container">
          <img src="images/offerposter.png" alt="Jio Poster" />
        </div>
      </div>

      
      {/* Footer */}
      <footer className="footer">
        <div className="container footer-container">
          <div className="footer-column">
            <h4>All Categories</h4>
            <ul>
              <li>Grocery</li>
              <li>Electronics</li>
              <li>Fashion</li>
              <li>Home & Lifestyle</li>
              <li>Premium Fruits</li>
              <li>Books</li>
              <li>Furniture</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Popular Categories</h4>
            <ul>
              <li>Biscuits, Drinks & Packaged Foods</li>
              <li>Fruits & Vegetables</li>
              <li>Cooking Essentials</li>
              <li>Dairy & Bakery</li>
              <li>Personal Care</li>
              <li>Beauty</li>
              <li>Home</li>
              <li>Mom & Baby Care</li>
              <li>School, Office & Stationery</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Customer Account</h4>
            <ul>
              <li>My Account</li>
              <li>My Orders</li>
              <li>Wishlist</li>
              <li>Delivery Addresses</li>
              <li>JioMart Wallet</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Help & Support</h4>
            <ul>
              <li>About Us</li>
              <li>FAQ</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>E-waste Policy</li>
              <li>Cancellation & Return Policy</li>
              <li>Shipping & Delivery Policy</li>
              <li>AC Installation by resQ</li>
            </ul>
          </div>

          <div className="footer-column contact">
            <h4>Contact Us</h4>
            <p>WhatsApp us: <a href="#">70003 70003</a></p>
            <p>Call us: <a href="#">1800 890 1222</a></p>
            <p>8:00 AM to 8:00 PM, 365 days</p>

            <h4>Download the app</h4>
            <div className="app-links">
              <img src="images/playstore.png" alt="Google Play" />
              <img src="images/appstore.png" alt="App Store" />
            </div>
          </div>
        </div>
      </footer>


      {/* ---- Shopping List Modal ---- */}
      {showShoppingList && (
        <div className="shoppinglist_overlay">
          <div className="shoppinglist_modal">
            <div className="shoppinglist_header">
              <h3>Shopping List</h3>
              <button className="close_btn" onClick={() => setShowShoppingList(false)}>
                ×
              </button>
            </div>
            <p>Search multiple products by entering your shopping list below.</p>

            <label>Enter Item List</label>
            <textarea
              placeholder="e.g. Milk, Bread, Fruit"
              className="shoppinglist_textarea"
            ></textarea>
            <small>Add comma as separator</small>

            <div className="shoppinglist_actions">
              <button className="clear_btn">Clear</button>
              <button className="search_btn">Search All</button>
            </div>
          </div>
        </div>
      )}
     
      
    </div>
  );
}

export default Jionav;
