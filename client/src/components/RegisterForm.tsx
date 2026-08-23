import { Link } from "react-router-dom";

const RegisterForm = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <form
          action=""
          className="bg-gray-100 w-2xl p-20 flex flex-col rounded-md"
        >
          <h1 className="font-primary tracking-wider text-2xl m-4">
            Sign Up for Shortly
          </h1>

          <label htmlFor="name">Full Name</label>
          <input type="text" className="bg-white px-4 py-2 m-2 rounded-md" placeholder="Rahul Patra" required/>

          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="someone@email.com"
            className="bg-white px-4 py-2 m-2 rounded-md"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="bg-white px-4 py-2 m-2 rounded-md"
            required placeholder="password"
          />

          <button
            type="submit"
            className="bg-blue-700 px-4 py-2 rounded-md text-white m-2"
          >
            Sign Up
          </button>
        </form>
        <span className="text-gray-500 mt-10">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700">Login</Link>
        </span>
      </div>
    </>
  );
};

export default RegisterForm;
