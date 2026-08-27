import axios from "axios";
import { useState, useEffect } from "react";

type Item = {
  id: string;
  originalUrl: string;
  shortUrl: string;
};

const ShowUrls = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [urls, setUrls] = useState<Item[]>([]);

  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [editForm, setEditForm] = useState<string | null>(null);

  useEffect(() => {
    async function getUrls() {
      const response = await axios.get("http://localhost:3000/api/v1/urls", {
        params: {
          page: currentPage,
          limit: itemsPerPage,
        },
        withCredentials: true,
      });
      const currentItems = response.data.urls;
      setTotalPages(response.data.totalItems / itemsPerPage);
      setUrls(currentItems);
    }
    getUrls();
  }, [currentPage, itemsPerPage]);

  async function deleteUrl(id: string) {
    try {
      await axios.delete(`http://localhost:3000/api/v1/urls/${id}`, {
        withCredentials: true,
      });

      setUrls((currentUrls) => currentUrls.filter((url) => url.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <ul>
        {urls.map((item: Item) => (
          <div className="m-4 bg-gray-100 p-2 rounded-md flex items-center justify-between">
            <div key={item.id}>
              <li>
                Original Url:
                <span className="text-gray-500">{item.originalUrl}</span>
              </li>
              <li>
                Short Url:
                <a
                  href={`http://localhost:3000/${item.shortUrl}`}
                  target="_blank"
                  className="bg-blue m-1 px-1 py-1/2 text-white bg-blue-700 rounded-sm"
                >
                  http://localhost:3000/{item.shortUrl}{" "}
                </a>
              </li>
              {/** Edit Form */}
              {editForm === item.id && (
                <form
                  action={`http://localhost:3000/api/v1/urls/${item.id}`}
                  method="post"
                  className="flex flex-col bg-gray-100 w-full m-4 p-10 rounded-lg h-full font-secondary gap-y-5"
                >
                  <div>
                    <h1 className="text-2xl font-extrabold">
                      Shorten a long link
                    </h1>
                    <span className="font-secondary-italic"></span>
                  </div>

                  <label htmlFor="">Paste your long link here...</label>
                  <div className="font-secondary-italic flex gap-x-5 m">
                    <input
                      type="url"
                      className="px-4 py-2 bg-white text-black rounded-md w-2/3"
                      placeholder="https://www.yourboringlonglink.com/pages"
                      required
                      name="newOriginalUrl"
                      value={originalUrl}
                      onChange={(e) => setOriginalUrl(e.target.value)}
                    />
                    <input
                      type="text"
                      className="px-4 py-2 bg-white text-black w-1/3 rounded-md"
                      placeholder="suggest short url (optional)"
                      name="newShortUrl"
                      value={shortUrl}
                      onChange={(e) => setShortUrl(e.target.value)}
                    />
                    <button
                      type="button"
                      className="bg-black text-white px-4 py-2 rounded-md w-1/3 font-secondary"
                    >
                      Auto Generate
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="w-fit px-4 py-2 bg-blue-700 rounded-md text-white"
                  >
                    Update your short link
                  </button>
                </form>
              )}
              {/** Edit Form */}
            </div>
            <div className="flex gap-x-10">
              {editForm !== item.id && (
                <button
                  className="bg-blue-700 text-white font-secondary px-4 py-2 rounded-sm"
                  onClick={() => {
                    setEditForm(item.id);
                    setShortUrl(item.shortUrl);
                    setOriginalUrl(item.originalUrl);
                  }}
                >
                  Edit
                </button>
              )}
              {editForm === item.id && (
                <button
                  className="bg-blue-700 text-white font-secondary px-4 py-2 rounded-sm"
                  onClick={() => setEditForm(null)}
                >
                  Cancel
                </button>
              )}

              <button
                className="bg-red-600 text-white font-secondary px-4 py-2 rounded-sm"
                onClick={() => deleteUrl(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </ul>

      {/* Pagination Bar */}
      <div className="flex border border-gray-200 m-4 p-4 rounded-md justify-center">
        <button
          className="bg-blue-700 text-white font-secondary px-4 py-2"
          onClick={() => {
            if (currentPage > 0) {
              setCurrentPage(currentPage - 1);
            }
          }}
        >
          Prev
        </button>
        <h2 className="bg-gray-700 text-white font-secondary px-4 py-2">
          {currentPage}
        </h2>
        <button
          className="bg-blue-700 text-white font-secondary px-4 py-2"
          onClick={() => {
            if (currentPage <= totalPages-2){
            setCurrentPage(currentPage + 1);
            }
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ShowUrls;
