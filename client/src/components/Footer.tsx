import linkedin from "../assets/icons/linkedin.svg";
import github from "../assets/icons/github.svg";
import website from "../assets/icons/website.svg";

const Footer = () => {
  return (
    <>
      <div className="flex px-20 py-10 items-center justify-between p-4 bg-blue-700 text-white font-secondary">
        <p>Made by Rahul Patra</p>
        <div className="flex gap-x-8">
          <a
            href="https://www.linkedin.com/in/rahulpatrain"
            target="_blank"
            className="bg-white p-2 rounded-full"
          >
            <img
              src={linkedin}
              alt="Linkedin"
              height={20}
              width={20}
              className="fill-white"
            />
          </a>

          <a
            href="https://github.com/patra-rahul"
            target="_blank"
            className="bg-white p-2 rounded-full"
          >
            <img src={github} alt="Github" height={20} width={20} />
          </a>

          <a
            href="https://rahulpatra.netlify.app"
            target="_blank"
            className="bg-white p-2 rounded-full"
          >
            <img src={website} alt="My Website Link" height={20} width={20} />
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
