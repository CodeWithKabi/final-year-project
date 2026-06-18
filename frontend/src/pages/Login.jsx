import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";
import { loginUser } from "../services/authService";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

export default function Login() {

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);

  try {
    const res = await loginUser(form);

    login(res.data);

    toast.success("Login Successful");

    setTimeout(() => {
      navigate("/");
    }, 1000);

  } catch (err) {
    setMessage(
      err.response?.data?.message ||
      "Login Failed"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <AuthLayout>

      <div style={{ textAlign: "center" }}>
  <div style={{ textAlign: "center" }}>

  <img
    src="/logo.png"
    alt="SleepAI"
    style={{
      width: "90px",
      height: "90px",
      objectFit: "contain",
      marginBottom: "10px",
    }}
  />

  <h1
    style={{
      fontSize: "42px",
      fontWeight: "900",
      margin: 0,

      background:
        "linear-gradient(to right,#ffffff,#67e8f9)",

      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    SleepAI
  </h1>

  <p
    style={{
      color: "#e2e8f0",
      marginTop: "10px",
      marginBottom: "10px",
      fontSize: "18px",
    }}
  >
    AI-Based Sleep Disorder Detection System
  </p>

</div>
<div
  style={{
    marginTop: "10px",
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.1)",
    color: "#67e8f9",
    fontSize: "12px",
  }}
>
  Final Year Project • XGBoost Model
</div>
</div>
<p
  style={{
    color: "#cbd5e1",
    fontSize: "13px",
    textAlign: "center",
    marginBottom: "20px",
  }}
>
 ⚠️ Demo Note:
The backend is hosted on a free-tier cloud service. The first login or page load may take 30–60 seconds while the server wakes up.
</p>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
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
            value={form.password}

          onChange={handleChange}
          required
          style={{
    color: "#231b1b",
  }}
        />

        <button
  type="submit"
  disabled={loading}
  style={{
    opacity: loading ? 0.8 : 1,
    cursor: loading
      ? "not-allowed"
      : "pointer",
  }}
>
  {loading
    ? "🧠 Verifying Access..."
    : "🔐 Secure Login"}
</button>
        <p
  style={{
    textAlign: "center",
    color: "#cbd5e1",
    fontSize: "13px",
    marginTop: "15px",
  }}
>
  React • Flask • MySQL • XGBoost
</p>

      </form>

      {
  message && (

    <p
      style={{
        color: "#ff6b6b",
        marginTop: "10px",
        textAlign: "center",
      }}
    >
      {message}
    </p>

  )
}
{/* Demo Login */}
<div
  style={{
    marginTop: "12px",
    padding: "10px",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.06)",
    textAlign: "center",
    color: "white",
  }}
>
  <strong
    style={{
      fontSize: "15px",
    }}
  >
    🚀 Quick Demo Login
  </strong>

  <p
    style={{
      margin: "6px 0 2px",
      fontSize: "13px",
      color: "#e2e8f0",
    }}
  >
    admin@gmail.com
  </p>

  <p
    style={{
      margin: "0 0 8px",
      fontSize: "13px",
      color: "#e2e8f0",
    }}
  >
    1234
  </p>

  <button
    type="button"
    onClick={() =>
      setForm({
        email: "admin@gmail.com",
        password: "1234",
      })
    }
    style={{
      width: "100%",
      padding: "8px",
      border: "none",
      borderRadius: "8px",
      background:
        "linear-gradient(to right,#06b6d4,#8b5cf6)",
      color: "white",
      fontWeight: "600",
      fontSize: "13px",
      cursor: "pointer",
    }}
  >
    Fill Demo Credentials
  </button>
</div>
<div
  style={{
    textAlign: "center",
    color: "#94a3b8",
    fontSize: "12px",
    marginTop: "10px",
  }}
>
  Final Year Project 2026
  <br />
  Department of Computer Applications
</div>
      {/* <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p> */}

    </AuthLayout>
  );
}