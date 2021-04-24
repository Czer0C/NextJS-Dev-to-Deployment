import Layout from "@/components/Layout";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import styles from "@/styles/AuthForm.module.css";

import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import AuthContext from "@/context/AuthContext";

export default function RegisterPage() {
  const [username, usernameSet] = useState("");
  const [email, emailSet] = useState("");
  const [password, passwordSet] = useState("");
  const [passwordConfirm, passwordConfirmSet] = useState("");

  const { register, error } = useContext(AuthContext);
  useEffect(() => error && toast.error(error));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error("Password confirm does not match");
    } else {
      register({
        username,
        email,
        password,
      });
    }
  };

  return (
    <Layout title="User Registration">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Registration
        </h1>
        <ToastContainer />

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>

            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => usernameSet(e.target.value)}
            />
          </div>

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

          <div>
            <label htmlFor="passwordConfirm">Confirm Password</label>

            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => passwordConfirmSet(e.target.value)}
            />
          </div>

          <input type="submit" value="Register" className="btn-info" />
        </form>

        <p>
          Already have an account? <Link href="/account/login">Login Here</Link>
        </p>
      </div>
    </Layout>
  );
}
