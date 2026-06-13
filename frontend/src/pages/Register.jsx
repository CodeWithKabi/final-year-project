import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { registerUser } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "User",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await registerUser(form);
      setMessage(res.data.message);
      navigate("/login");
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  return (
    <AuthLayout>
      <h1 style={{ textAlign: "center" }}>Create Account</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          onChange={handleChange}
          required
          style={{
            color: "#231b1b",
          }}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={{
            color: "#231b1b",
          }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          style={{
            color: "#231b1b",
          }}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
          style={{
            color: "#231b1b",
          }}
        />

        <select name="role" onChange={handleChange} style={{
    background: "#ffffff",
    color: "rgb(142, 139, 139)",
  }}>
          <option
            style={{
              color: "#231b1b",
            }}
          >
            {" "}
            User
          </option>
          <option
            style={{
              color: "#231b1b",
            }}
          >
            Admin
          </option>
        </select>

        <button type="submit">Register</button>
      </form>

      <p>{message}</p>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </AuthLayout>
  );
}
