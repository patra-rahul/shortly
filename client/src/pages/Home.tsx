import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Background from "../components/Background";

const Home = () => {
  return (
    <>
      <Background />
      <Navbar loginBtn={true} registerBtn={true} logoutBtn={false}/>
      <Hero />
      <Footer />
    </>
  );
};

export default Home;
