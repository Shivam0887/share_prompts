"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import tick from "../public/assets/icons/tick.svg";
import copy from "../public/assets/icons/copy.svg";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");
  const pathName = usePathname();
  const { data: session } = useSession();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);

    setTimeout(() => {
      setCopied("");
    }, 2000);
  };

  const handleProfile = () => {
    if (post?.author._id == session?.user.id) router.push("/profile");
    else router.push(`/profile/user?id=${post.author._id}`);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfile}
        >
          <Image
            src={post.author.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.author.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.author.email}
            </p>
          </div>
        </div>

        <div className="copy_btn relative" onClick={handleCopy}>
          <span
            className={
              copied
                ? "absolute text-sm top-[-56px] w-[150px] bg-slate-200 p-1 rounded-md"
                : "hidden"
            }
          >
            Copied to Clipboard
          </span>
          <Image
            src={copied === post.prompt ? tick : copy}
            width={12}
            height={12}
            alt="copy_button"
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {session?.user.id === post.author._id && pathName === "/profile" && (
        <div className="mt-5 flex justify-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter font-semibold text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter font-semibold text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
