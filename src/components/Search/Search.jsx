import React, { useEffect, useRef, useState } from "react";

const Search = ({ onChange, placeholder }) => {
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    // Auto-focus the input when the component mounts
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    onChange(e.target.value);
  };


  return (
    <form className="md:max-w-[480px] w-full lg:px-4 hidden md:block">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          name="q"
          className="w-full outline-[2px] placeholder:text-[#a1a1a1] focus-within:bg-white bg-gradient-to-r from-[#fbfeff] to-transparent md:placeholder:text-[11px] lg:placeholder:text-[14px] focus-within:outline-none h-12 shadow p-4 rounded-full"
          placeholder={placeholder || "Search"}
          onChange={handleChange}
        />
        <button type="button" onClick={() => console.log("Search clicked")}>
          <svg
            className="text-light-gray h-3 w-3 md:h-5 md:w-5 absolute top-3.5 right-3 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 56.966 56.966"
            style={{ enableBackground: "new 0 0 56.966 56.966" }}
            xmlSpace="preserve"
          >
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"></path>
          </svg>
        </button>
      </div>
    </form>
  );
};

export default Search;