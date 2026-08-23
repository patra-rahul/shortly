const Navbar = () => {
  return (
    <>
      <div className="flex justify-between p-4 items-center bg-blue-700 text-white sticky top-0 z-50 scro">
        <div className="font-primary-italic text-4xl ml-10">Shortly</div>
        <div className="font-secondary text-2xl">
          <ul className="flex gap-x-2">
            <li className="border px-4 py-2 m-2 rounded-md">
              <a href="">Login</a>
            </li>
            <li className="border px-4 py-2 m-2 rounded-md bg-white text-blue-700">
              <a href="">Sign up Free</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar