import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <form
          action=""
          className="bg-gray-100 w-2xl p-20 flex flex-col rounded-md"
        >
          <h1 className="font-primary tracking-wider text-2xl m-4">
            Login to Shortly
          </h1>
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
            required
            placeholder="password"
          />

          <button
            type="submit"
            className="bg-blue-700 px-4 py-2 rounded-md text-white m-2"
          >
            Login
          </button>

          <p className="flex justify-center font-secondary text-gray-600">or</p>

          {/* Login using Google Account */}
          <a
            href="http://localhost:3000/api/v1/auth/google"
            className="flex justify-center text-white bg-red-600 font-secondary px-4 py-2 m-2 rounded-md"
          >
            Continue with Google
          </a>
        </form>
        <span className="text-gray-500 mt-10">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-700">
            Register
          </Link>
        </span>
      </div>
    </>
  );
};

export default Login;
