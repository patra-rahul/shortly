import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

const Dashboard = () => {
  return (
    <>
    <Navbar loginBtn={false} registerBtn={false} logoutBtn={true}/>
    Dashboard
    <Footer />
    </>
  )
}

export default Dashboard