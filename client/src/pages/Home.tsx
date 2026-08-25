import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Background from "../components/Background";
import axios from "axios";
import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";

type User = {
  email: String;
  name: String;
};

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/auth/me",
          {
            withCredentials: true,
          },
        );
        if (!response) {
          setUser(null);
          return;
        }
        setUser(response.data);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }
  if (!user) {
    return (
      <>
        <Background />
        <Navbar loginBtn={true} registerBtn={true} logoutBtn={false} />
        <Hero />
        <Footer />
      </>
    );
  }

  return <Dashboard />;
};

export default Home;
