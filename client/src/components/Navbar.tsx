import { Link } from "react-router-dom";

type Prop = {
  loginBtn: Boolean;
  registerBtn: Boolean;
  logoutBtn: Boolean;
};

const Navbar = (prop: Prop) => {
  return (
    <>
      <div className="flex justify-between p-4 items-center bg-blue-700 text-white sticky top-0 z-50 scro">
        <div className="font-primary-italic text-4xl ml-10">
          <Link to="/">Shortly</Link>
        </div>
        <div className="font-secondary text-2xl">
          <ul className="flex gap-x-2">
            {prop.loginBtn && (
              <li className="border px-4 py-2 m-2 rounded-md">
                <Link to="/login">Login</Link>
              </li>
            )}
            {prop.registerBtn && (
              <li className="border px-4 py-2 m-2 rounded-md bg-white text-blue-700">
                <Link to="/register">Sign up for Free</Link>
              </li>
            )}

            {prop.logoutBtn && (
              <li className="border px-4 py-2 m-2 rounded-md bg-white text-blue-700">
                <Link
                  to="/"
                  onClick={() =>
                    (window.location.href =
                      "http://localhost:3000/api/v1/auth/logout")
                  }
                >
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
