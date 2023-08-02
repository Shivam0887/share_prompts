"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.length > 0 ? (
        data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))
      ) : (
        <p className="absolute ml-[-50px] text-gray-500">No Prompt Found</p>
      )}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPrompts(data);
    })();
  }, []);

  const filterResult = (search) => {
    const regex = new RegExp(search, "i");
    return prompts.filter((post) => {
      const isMatchFound =
        regex.test(post.author.username) ||
        regex.test(post.prompt) ||
        regex.test(post.tag);

      if (isMatchFound) return post;
    });
  };

  const handleSearchChange = (e) => {
    clearTimeout(timeoutId);
    setSearchText(e.target.value);

    setSearchResults(
      setTimeout(() => {
        const res = filterResult(e.target.value);
        setSearchResults(res);
      }, 500)
    );
  };

  const handleTagClick = (search) => {
    setSearchText(search);

    const res = filterResult(search);
    setSearchResults(res);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex justify-center">
        <input
          type="text"
          size={50}
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={searchText.length > 0 ? searchResults : prompts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
