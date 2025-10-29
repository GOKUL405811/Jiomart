import React, { useState, useRef, useEffect } from "react";
import "./Electronis.css";

function Electronis() {
  const [showPincode, setShowPincode] = useState(true);
  const [activeTab, setActiveTab] = useState(""); 
  
  const lastScrollY = useRef(0);

  // ✅ Detect scroll direction (hide/show pincode)
  useEffect(() => {
    const handleWindowScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY.current) {
        setShowPincode(false); // scrolling down → hide
      } else {
        setShowPincode(true); // scrolling up → show
      }

      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleWindowScroll);
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  // ✅ Detect current path to set active tab
  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/") setActiveTab("Mobiles");
    else if (path === "/Electronis") setActiveTab("Electronics");
    else if (path === "/Homecycle") setActiveTab("Home & Lifestyle");
    else if (path === "/Fashion") setActiveTab("Fashion");
  }, []);

  // ✅ Handle tab click
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="electronics_page">
      {/* ✅ Top Navbar */}
      <div className="jiomart_nav">
        <div className="container nav_content">
          <div className="nav_left">
            <img src="images/jiomart.png" alt="jio_mart_icon" className="nav_logo_img" />
            <p><b>JioMart</b></p>
          </div>

          <div className="nav_center">
            <div className="search_container">
              <img src="images/search.png" alt="search_icon" className="search_icon" />
              <input type="text" placeholder="Search In JioMart" className="nav_input" />
              <img src="images/list.png" alt="list_icon" className="list_icon" />
            </div>

            <div className="grocery_div">
              <a href="/Grocart">
                <img src="images/grocery.png" alt="grocery" className="grocery_icon" />
              </a>
            </div>

            <div className="profile_div">
              <img src="images/profile.png" alt="profile" className="profile_icon" />
              <a href="/Signin" className="profile_text"><p>Sign In</p></a>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Pincode Bar */}
      <div className={`pincode ${showPincode ? "show" : "hide"}`}>
        <div className="container">
          <p><b>Scheduled delivery to:</b> ' your pincode '</p>
        </div>
      </div>

      {/* ✅ Item Nav */}
      <div className={`item_mainnav ${showPincode ? "down" : "up"}`}>
        <div className="items_nav_container">
          <div className="items_nav arrow">
            <img src="images/back.png" alt="back" />
          </div>

          <div 
            className={`items_nav ${activeTab === "Mobiles" ? "active" : ""}`} 
            onClick={() => handleTabClick("Mobiles")}
          >
            <a href="/"><img src="images/phones.jpg" alt="phone" /><p>Mobiles</p></a>
          </div>

          <div 
            className={`items_nav ${activeTab === "Electronics" ? "active" : ""}`} 
            onClick={() => handleTabClick("Electronics")}
          >
            <a href="/Electronis"><img src="images/electronics.jpg" alt="electronics" /><p>Electronics</p></a>
          </div>

          <div 
            className={`items_nav ${activeTab === "Home & Lifestyle" ? "active" : ""}`} 
            onClick={() => handleTabClick("Home & Lifestyle")}
          >
            <a href="/Homecycle"><img src="images/sofa.jpg" alt="sofa" /><p>Home & Lifestyle</p></a>
          </div>

          <div 
            className={`items_nav ${activeTab === "Fashion" ? "active" : ""}`} 
            onClick={() => handleTabClick("Fashion")}
          >
            <a href="/Fashion"><img src="images/fation.jpg" alt="fashion" /><p>Fashion</p></a>
          </div>

          <div className="items_nav arrow">
            <img src="images/next.png" alt="next" />
          </div>
        </div>
      </div>

      {/* ✅ My List & Offers Section */}
      <div className="offers_section">
        <div className="offers_wrapper">
          <h2>My List & Offers</h2>
          <div className="offers_products">
            <div className="product_card">
              <img src="images/apple.png" alt="Airpods" />
              <h3>Apple Airpods Pro</h3>
              <p>₹25900.00</p>
              <button>Add</button>
            </div>
            <div className="product_card">
              <img src="images/OnePlus Buds 3.png" alt="OnePlus Buds" />
              <h3>OnePlus Buds 3</h3>
              <p>₹5499.00</p>
              <button>Add</button>
            </div>
            <div className="product_card">
              <img src="images/xaomi.png" alt="Realme Phone" />
              <h3>Xiaomi 14 CIVI 5G</h3>
              <p>₹26999.00</p>
              <button>Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Electronis;
