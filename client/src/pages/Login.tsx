import Navbar from "../components/Navbar";
import LoginForm from "../components/LoginForm";
import Background from "../components/Background";
import Footer from "../components/Footer";

const Login = () => {
  return (
    <>
      <Background />
      <Navbar loginBtn={true} registerBtn={true} logoutBtn={false}/>
      <LoginForm />
      <Footer />
    </>
  );
};

export default Login;
