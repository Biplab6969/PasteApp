import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { removeFromPastes } from "../redux/pasteSlice";
import { useDispatch, useSelector } from "react-redux";

function Paste() {
  const pastes = useSelector((state) => state.pastes) || [];
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-3">
        <div className="w-full flex gap-3 px-4 py-2  rounded-[0.3rem] border border-[rgba(128,121,121,0.3)]  mt-6">
          <input
            className="p-2 rounded-2xl min-w-[600px] mt-5 focus:outline-none w-full bg-transparent"
            type="search"
            placeholder="Search paste here ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col border border-[rgba(128,121,121,0.3)] py-4 rounded-[0.4rem]">
          <h2 className="px-4 text-4xl font-bold border-b border-[rgba(128,121,121,0.3)] pb-4">
            All Pastes
          </h2>
          <div className="w-full px-4 pt-4 flex flex-col gap-y-5">
            {filteredData.length > 0 &&
              filteredData.map((paste) => {
                return (
                  <div
                    key={paste._id}
                    className="border border-[rgba(128,121,121,0.3)] w-full gap-y-6 justify-between flex flex-col sm:flex-row p-4 rounded-[0.3rem]"
                  >
                    <div className="w-[50%] flex flex-col space-y-3">
                      <p className="text-4xl font-semibold ">{paste?.title}</p>
                      <p className="text-sm font-normal line-clamp-3 max-w-[80%] text-[#707070]">
                        {paste?.content}
                      </p>
                    </div>

                    {/*icons*/}

                    <div className="flex flex-col gap-y-4 sm:items-end">
                      <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                        <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-blue-500">
                          <a href={`/?pasteId=${paste?._id}`}>
                            <PencilLine
                              className="text-black group-hover:text-blue-500"
                              size={20}
                            />
                          </a>
                        </button>
                        <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-pink-500">
                          <a href={`/pastes/${paste?._id}`}>
                            <Eye
                              className="text-black group-hover:text-orange-500"
                              size={20}
                            />
                          </a>
                        </button>
                        <button
                          className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-pink-500"
                          onClick={() => handleDelete(paste?._id)}
                        >
                          <Trash2
                            className="text-black group-hover:text-pink-500"
                            size={20}
                          />
                        </button>
                        <button
                          className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-pink-500"
                          onClick={() => {
                            navigator.clipboard.writeText(paste?.content);
                            toast.success("copied to clipboard");
                          }}
                        >
                          <Copy
                            className="text-black group-hover:text-green-500"
                            size={20}
                          />
                        </button>
                        <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-pink-500">
                          <Calendar className="text-black" size={20} />
                        </button>
                      </div>
                    </div>
                    <div>{paste.createdAt}</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paste;
