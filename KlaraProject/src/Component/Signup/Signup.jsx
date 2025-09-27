import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import Logo from "./image.png";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const navigate = useNavigate();
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();

    // البيانات اللي هنرسلها للـ API
    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      confirm: form.confirm,
    };

    // استخدام fetch
    fetch("https://example.com/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("خطأ في التسجيل ❌");
        }
        return res.json();
      })
      .then((data) => {
        console.log("API response:", data);
        alert("تم إنشاء الحساب بنجاح ✅");
        navigate("/home");
      })
      .catch((err) => {
        console.error(err);
        alert("فشل التسجيل ⚠️");
      });
  }


  return (
    <div className="signup-page">
      <div className="signup-card">

        <div className="logo">
          <Link to={"/home"}><img src={Logo} alt="logo" /></Link>
        </div>

        <h2 className="title">Sign Up</h2>

        <form className="form" onSubmit={handleSubmit}>

          <label>Full Name</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />

          <label>Email Address</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />

          <label>Password</label>
          <div className="password-field">
            <input name="password" type={showPassword ? "text" : "password"} value={form.password}
              onChange={handleChange} placeholder="Enter your password" required />

            <button type="button" onClick={() => setShowPassword((s) => !s)} className="eye-btn" aria-label="toggle password" >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <label>Confirm Password</label>
          <div className="password-field">
            <input
              name="confirm"
              type={showConfirm ? "text" : "password"}  // 👈 استخدام state مختلف
              value={form.confirm}
              onChange={handleChange}
              placeholder="Re-enter password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm((s) => !s)} // 👈 زرار مستقل
              className="eye-btn"
              aria-label="toggle confirm password"
            >
              {showConfirm ? "Hide" : "Show"}
            </button>
          </div>

          <button type="submit" className="submit-btn">
            Create Account
          </button>
        </form>

        <div className="footer">
          Already have an account? <Link to="/login">Log In</Link>

        </div>

      </div>
    </div>
  );
}