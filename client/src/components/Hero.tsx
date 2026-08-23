import github from "../assets/icons/github.svg";
const Hero = () => {
  return (
    <>
      <div className="m-4 p-4 flex flex-col items-center justify-center">
        <div className="flex gap-x-3 mt-20">
          <p>An Open Source Project</p>
          <a href="https://github.com/patra-rahul/shortly" target="_blank">
            <img src={github} alt="" width={20} height={20} />
          </a>
        </div>
        <h1 className="font-primary-italic text-blue-700 text-[75px] leading-20 my-15">
          The Internet is <span className="font-bold"> Long Enough </span>{" "}
          <br />
          Your <span className="font-bold">URLS </span> don't have to be.
        </h1>

        <div className="flex flex-col bg-gray-100 w-full m-4 p-10 rounded-lg h-full font-secondary gap-y-5">
          <div>
            <h1 className="text-2xl font-extrabold">Shorten a long link</h1>
            <span className="font-secondary-italic">
              No credit card required...
            </span>
          </div>

          <label htmlFor="">Paste your long link here...</label>
          <div className="font-secondary-italic flex gap-x-5 m">
            <input
              type="url"
              className="px-4 py-2 bg-white text-black rounded-md w-2/3"
              placeholder="https://www.yourboringlonglink.com/pages"
            />
            <input
              type="text"
              className="px-4 py-2 bg-white text-black w-1/3 rounded-md"
              placeholder="suggest short url"
            />
            <button className="bg-black text-white px-4 py-2 rounded-md w-1/3 font-secondary">
              Auto Generate
            </button>
          </div>
          <button
            type="submit"
            className="w-fit px-4 py-2 bg-blue-700 rounded-md text-white"
          >
            Get your short link
          </button>
        </div>

        <span className="font-secondary-italic tracking-wider text-gray-400">
          Sign Up for free. For education purpose only.
        </span>
      </div>
    </>
  );
};

export default Hero;
