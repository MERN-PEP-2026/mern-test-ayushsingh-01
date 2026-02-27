import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginStudent } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginStudent(formData);
      login(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page auth-page">
      <form className="card" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>{loading ? "Please wait..." : "Login"}</button>
        <p>
          New student? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}
