// src/components/Login.jsx
import React, { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      // Redirect to user dashboard or homepage
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" ref={emailRef} placeholder="Email" required />
      <input type="password" ref={passwordRef} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}
