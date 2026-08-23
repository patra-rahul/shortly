import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Info from "./components/Footer"

const App = () => {
  return (
    <>
      <div>
        <div className="fixed -z-10 inset-0 h-full w-full bg-[radial-gradient(circle,#73737350_1px,transparent_1px)] bg-size-[10px_10px]" />
        <Navbar />
        <Hero />
        <Info />
      </div>
    </>
  );
}

export default App