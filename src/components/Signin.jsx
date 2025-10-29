import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // ✅ import navigation
import "./Signin.css";

function Signin() {
  const [mobile, setMobile] = useState("");
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate(); // ✅ navigation hook

  // Validate mobile number
  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // only digits
    setMobile(value);
    setIsValid(value.length === 10);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      alert("Mobile number submitted: " + mobile);

      // ✅ Redirect to home (Jionav.jsx)
      navigate("/");
    }
  };

  return (
    <div className="signin_page">
      <div className="signin_card">
        {/* Close button */}
        <a href="/"><div className="close_btn">✕</div></a>

        {/* Title */}
        <h2>Almost there!</h2>
        <p className="subtitle">Simply sign in to place your order</p>

        {/* Input */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="mobile">Mobile Number</label>
          <div className="input_wrapper">
            <span className="country_code">+91</span>
            <input
              type="tel"
              id="mobile"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={handleChange}
              maxLength="10"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className={`signin_btn ${isValid ? "active" : ""}`}
            disabled={!isValid}
          >
            Sign In
          </button>
        </form>

        {/* Footer text */}
        <p className="footer_text">
          By signing in, you agree to our{" "}
          <a href="#">Terms and Conditions of Use</a> and{" "}
          <a href="#">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}

export default Signin;
