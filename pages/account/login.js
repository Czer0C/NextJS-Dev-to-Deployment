import Layout from "@/components/Layout";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import styles from "@/styles/AuthForm.module.css";

import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import AuthContext from "@/context/AuthContext";

export default function LoginPage() {
  const [email, emailSet] = useState("");
  const [password, passwordSet] = useState("");

  const { login, error } = useContext(AuthContext);

  useEffect(() => error && toast.error(error));

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      email,
      password,
    });
  };

  return (
    <Layout title="User Login">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Login
        </h1>
        <ToastContainer />

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>

            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => emailSet(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>

            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => passwordSet(e.target.value)}
            />
          </div>

          <input type="submit" value="Login" className="btn-info" />
        </form>

        <p>
          Don't have an account?{" "}
          <Link href="/account/register">Register Here</Link>
        </p>
      </div>
    </Layout>
  );
}
