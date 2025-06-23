import { useState } from "react";//ok
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/Form.module.css";
import axios from "axios";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://consultancy-stock-management-app-backend.onrender.com/api/signup", form);
      alert("Signup successful");
      navigate("/dashboard");
    } catch (err) {
      alert("Signup failed: " + err.response?.data?.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Signup</h2>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Signup</button>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </form>
  );
}

export default Signup;
