"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPrompt = async () => {
      const response = await fetch(`/api/prompt/${searchParams.get("id")}`);
      const data = await response.json();
      setPost(data);
    };
    getPrompt();
  }, []);

  const editPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(
        `/api/prompt/${searchParams.get("id").toString()}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            prompt: post.prompt,
            userId: session?.user.id,
            tag: post.tag,
          }),
        }
      );

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editPrompt}
    />
  );
};

export default EditPrompt;
