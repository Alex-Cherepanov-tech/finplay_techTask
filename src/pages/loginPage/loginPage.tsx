import React, { useState } from "react";
import axios from "axios";
import styles from "./loginPage.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/image.png";

interface LoginPageProps {
  onLogin: (message: string) => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });

      console.log(response.data);
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("sessionId", response.data.sessionId);
      
      onLogin(response.data.message);
      navigate("/games");
    } catch (e) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className={styles.container}>
      <img src={logo} alt="logo" className={styles.logo} />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={styles.input}
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            type="password"
            className={styles.input}
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
