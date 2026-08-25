import Background from "../components/Background";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <>
      <Background />
      <Navbar loginBtn={true} registerBtn={true} logoutBtn={false}/>
      <RegisterForm />
      <Footer />
    </>
  );
};

export default Register;
