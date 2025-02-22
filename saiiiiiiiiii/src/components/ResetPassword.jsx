import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaTwitter, FaLinkedin, FaDiscord, FaGoogle, FaApple } from "react-icons/fa";
import "../styles/ResetPassword.css";
import styles from "../styles/Signup.module.css";


const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, securityAnswer, newPassword }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        navigate("/login");
      }
    } catch (error) {
      setMessage("Password reset failed. Please try again.");
    }
  };

  return (
    <div className="reset-container">
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
        <div className="reset-box">
          <h2>Reset Password</h2>
          <p>Enter your details to reset your password</p>

          {/* Social login buttons */}
          <div className="social-login">
            <button className="google-btn">
              <FaGoogle className="icon" /> Reset via Google
            </button>
            <button className="apple-btn">
              <FaApple className="icon" /> Reset via Apple
            </button>
          </div>

          {/* Reset Password Form */}
          <form onSubmit={handleSubmit}>
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
              <label className={styles.label}>Security Question: Your School Name?</label>
              <input
              className={styles.input}
                type="text"
                placeholder="Answer"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>New Password</label>
              <input
              className={styles.input}
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <button className="reset-btn" type="submit">Reset Password</button>
          </form>

          <p className="login-text">
            Remembered your password? <span onClick={() => navigate("/login")}>Sign in here</span>
          </p>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
