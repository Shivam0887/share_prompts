import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.length > 0 ? (
          data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit(post)}
              handleDelete={() => handleDelete(post)}
            />
          ))
        ) : (
          <p className="gray-500">No Prompt Found</p>
        )}
      </div>
    </section>
  );
};

export default Profile;
