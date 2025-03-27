"use client";

import { useState } from "react";
import { useAuth } from "@/app/(context)/UserContext";
import { useRouter } from "next/navigation";

import "./LoginForm.css";
import Link from "next/link";
export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`submit-button ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p>
            <Link href={"/user/register"}>register now!</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
