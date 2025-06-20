import { Link } from "react-router-dom";//ok
import { isAuthenticated } from "../utils/auth";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <Navbar />
      <h1>Welcome to Our App</h1>
    </div>
  );
}

export default Home;
