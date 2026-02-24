// components/SearchDrawer.jsx
"use client";

import { useState } from "react";
import Image from "next/image";

export default function SearchDrawer({ onSearch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const toggleSearch = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setQuery(""); 
    onSearch("");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    
    <div className="my-4 w-full  ">
      {isOpen && (
        <div className="flex flex-row-reverse bg-gray-700">
            
          <input
            type="text"
            value={query}
            onChange={handleChange}
            
            className=" w-full rounded-lg focus:outline-none"
          />
        <button
                onClick={toggleSearch}
            className=" px-4 py-3 text-white rounded-lg "
            >
            <Image
            src="/assets/search.svg"
            width={18}
            height={18}
            alt="Home"
            />
          </button>
        </div>
        
      )}

      {!isOpen && (
        <button
          onClick={toggleSearch}
          className="  px-4 py-3 text-white rounded-lg "
        >
            <Image
            src="/assets/search.svg"
            width={18}
            height={18}
            alt="Home"
            />
        </button>
      )}
    </div>
  );
}