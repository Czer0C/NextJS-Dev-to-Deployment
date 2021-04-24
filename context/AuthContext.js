import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "@/config/index";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, userSet] = useState(null);
  const [error, errorSet] = useState(null);

  const router = useRouter();

  useEffect(() => checkUserLoggedIn(), []);

  const register = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.ok) {
      userSet(data.user);
      router.push("/account/dashboard");
    } else {
      errorSet(data.message);
      errorSet(null);
    }
  };

  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      userSet(data.user);
      router.push("/account/dashboard");
    } else {
      errorSet(data.message);
      errorSet(null);
    }
  };

  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });

    if (res.ok) {
      userSet(null);
      router.push("/");
    }
  };

  const checkUserLoggedIn = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();

    if (res.ok) {
      userSet(data.user);
    } else {
      userSet(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
