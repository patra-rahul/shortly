import axios from "axios";
import { useEffect, useState } from "react";

const CreateUrl = () => {
  const [name, setName] = useState(null);
  const [dialog, setDialog] = useState(false);
  useEffect(() => {
    async function loadUser() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/auth/me",
          { withCredentials: true },
        );
        if (!response) {
          setName(null);
        }
        setName(response.data.name);
      } catch (err) {}
    }
    loadUser();
  });
  return (
    <>
      <div className="flex m-4 p-4">
        <div className="flex justify-between w-full px-4 items-center">
          <h1 className="text-2xl font-secondary">
            Welcome, <span className="text-red-600">{name} 👋</span>
          </h1>
          <button
            className="font-secondary bg-blue-700 text-white px-4 py-2 rounded-md"
            onClick={() => setDialog(!dialog)}
          >
            + Create URL
          </button>
        </div>
      </div>

      {dialog && (
        <form
          className="flex flex-col bg-gray-100 w-full m-4 p-10 rounded-lg h-full font-secondary gap-y-5"
          action="http://localhost:3000/api/v1/urls"
          method="post"
        >
          <div>
            <h1 className="text-2xl font-extrabold">Shorten a long link</h1>
            <span className="font-secondary-italic"></span>
          </div>

          <label htmlFor="">Paste your long link here...</label>
          <div className="font-secondary-italic flex gap-x-5 m">
            <input
              type="url"
              className="px-4 py-2 bg-white text-black rounded-md w-2/3"
              placeholder="https://www.yourboringlonglink.com/pages"
              required
              name="originalUrl"
            />
            <input
              type="text"
              className="px-4 py-2 bg-white text-black w-1/3 rounded-md"
              placeholder="suggest short url (optional)"
              name="shortUrl"
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
        </form>
      )}
    </>
  );
};

export default CreateUrl;
