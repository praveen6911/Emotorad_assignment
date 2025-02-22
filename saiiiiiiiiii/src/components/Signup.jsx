import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGithub, FaTwitter, FaLinkedin, FaDiscord, FaGoogle, FaApple } from "react-icons/fa";
import styles from "../styles/Signup.module.css";
import { useGoogleLogin } from "@react-oauth/google";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const signupWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log("Google signup success:", tokenResponse);

        const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });

        const userData = await userInfoResponse.json();
        console.log("User Info:", userData);

        if (userData.email) {
          localStorage.setItem("email", userData.email);
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching Google user info:", error);
      }
    },
    onError: () => {
      console.log("Signup Failed");
    },
  });

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, securityAnswer }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        localStorage.setItem("email", email);
        navigate("/dashboard");
      }
    } catch (error) {
      setMessage("Signup failed. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.logo}>BASE</div>
        <div className={styles.socialIcons}>
          <FaGithub className={styles.icon} />
          <FaTwitter className={styles.icon} />
          <FaLinkedin className={styles.icon} />
          <FaDiscord className={styles.icon} />
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.signupBox}>
          <h2 className={styles.title}>Sign Up</h2>
          <p className={styles.subtitle}>Create a new account</p>

          <div className={styles.socialSignup}>
            <button className={styles.socialButton} onClick={() => signupWithGoogle()}>
              <FaGoogle className={styles.buttonIcon} /> Sign up with Google
            </button>
            <button className={styles.socialButton}>
              <FaApple className={styles.buttonIcon} /> Sign up with Apple
            </button>
          </div>

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

            <div className={styles.inputGroup}>
              <label className={styles.label}>What is your school Name?</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Security Answer"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                required
              />
            </div>

            <button type="submit" className={styles.signupButton}>
              Sign Up
            </button>
          </form>

          <p className={styles.loginText}>
            Already have an account? <Link to="/login" className={styles.link}>Sign in here</Link>
          </p>
          
          {message && <p className={styles.message}>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
