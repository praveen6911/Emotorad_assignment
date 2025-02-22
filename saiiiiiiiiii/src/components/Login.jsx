import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/Login.css";
import styles from "../styles/Signup.module.css";
import { FaGithub, FaTwitter, FaLinkedin, FaDiscord, FaGoogle, FaApple } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 
  const signinwithgoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log("Google login success:", tokenResponse);
  
        // Fetch user info using the access token
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
  
        const userData = await userInfoResponse.json();
        console.log("User Info:", userData);
  
        if (userData.email) {
          localStorage.setItem("email", userData.email); // Store email in localStorage
          navigate("/dashboard"); // Redirect to dashboard
        }
      } catch (error) {
        console.error("Error fetching Google user info:", error);
      }
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  useEffect(() => {
    // Check if email exists in localStorage, if yes, navigate to dashboard
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        localStorage.setItem("email", email); // Store email in localStorage
        navigate("/dashboard");
      }
    } catch (error) {
      setMessage("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      {/* Left Section */}
      <div className={styles.leftSection}>
        <div className={styles.logo}>BASE</div>
        <div className={styles.socialIcons}>
          <FaGithub className={styles.icon} />
          <FaTwitter className={styles.icon} />
          <FaLinkedin className={styles.icon} />
          <FaDiscord className={styles.icon} />
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="login-box">
          <h2>Sign In</h2>
          <p>Sign in to your account</p>
          
          {/* Sign in buttons */}
          <div className="social-login">
            <button className="google-btn" onClick={() => signinwithgoogle()}>
              <FaGoogle className="icon"/> Sign in with Google
            </button>
            <button className="apple-btn">
              <FaApple className="icon" /> Sign in with Apple
            </button>
          </div>

          {/* Login Form */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email address</label>
            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input 
              className={styles.input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <div className="forgot-password">
            <Link to="/reset-password">Forgot Password?</Link>
          </div>
          <button className="sign-in-btn" onClick={handleSubmit}>Sign In</button>

          <p className="register-text">
            Don't have an account? <Link to="/signup">Register here</Link>
          </p>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
