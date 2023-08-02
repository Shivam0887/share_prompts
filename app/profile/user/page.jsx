"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `/api/users/${searchParams.get("id").toString()}/posts`
        );
        const data = await response.json();

        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  const handleEdit = (post) => {
    router.push(`/edit-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    try {
      await fetch(`/api/prompt/${post._id}`, {
        method: "DELETE",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Profile
      name={posts.length > 0 && posts[0].author.username}
      desc={
        posts.length > 0 &&
        `Welcome to ${posts[0].author.username}'s personalized profile page`
      }
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
