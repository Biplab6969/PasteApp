import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

function Home() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.pastes);



  function createPaste() {
    const paste = {
      "title": title,
      "content": value,
      "_id": pasteId || Date.now().toString(36),
      "createAt": new Date().toISOString(),
    };
    


    if (pasteId) {
      //update
      dispatch(updateToPastes(paste));
    } else {
      //create
      
      
      dispatch(addToPastes(paste));
    }

    //after creation or updation
    setTitle("");
    setValue("");
    setSearchParams({});
  }
  const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
    // navigate("/");
  };

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
    <div className="flex flex-col gap-y-5 items-start">
      <div className="w-full flex flex-row gap-x-4 justify-between items-center">
        <input
          className="p-2 rounded-2xl mt-2 w-[66%] pl-4"
          type="text"
          placeholder="enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
         onClick={createPaste}>
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>
      <div className="mt-8">
        <textarea
          className="rounded-2xl mt-4, min-w-[500px] p-4"
          value={value}
          placeholder="enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
    </div>
  );
}

export default Home;
