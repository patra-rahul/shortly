import { useState, useEffect, use } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import axios from "axios"
import Home from "./Home"

type User = {
  name: String;
  email: String;
}

const Dashboard = () => {
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

  if(loading){
    return <div>Loading...</div>
  }

  if(!user){
    return <Home />
  }
  
  return (
    <>
    <Navbar loginBtn={false} registerBtn={false} logoutBtn={true}/>

    <Footer />
    </>
  )
}

export default Dashboard