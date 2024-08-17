import React, { useState } from "react";
import "./Login.css"; // Import the CSS file
import AuthImage from "../../assets/AuthImage.jpg"; // Import your image
import { supabase } from "@supabase/auth-ui-shared";
import { useUser } from "../../Hooks/useUserStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(true); // To toggle between sign-in and sign-up
  const [error, setError] = useState("");

  const { user, setUser } = useUser((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Sign in logic goes here
    console.log("Signing in with", { email, password });
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Username, email, and password are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    console.log(email, password);
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.log(error);
    } else {
      setUser(user);
      console.log("sucessful", user);
    }
  };

  return (
    <div className="login-container">
      <div
        className="image-side"
        style={{ backgroundImage: `url(${AuthImage})` }}
      ></div>
      <div className="form-side">
        <h2>{isSignIn ? "Sign In" : "Sign Up"}</h2>

        {error && <div className="error">{error}</div>}

        <form onSubmit={isSignIn ? handleSignInSubmit : handleSignUpSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="button">
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p>
          {isSignIn ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            className="toggle-button"
            onClick={() => setIsSignIn(!isSignIn)}
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

