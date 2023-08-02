import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex items-center flex-col">
      <h1 className="head_text text-center md:text-5xl">
        Discover & Share
        <br className="md:hidden" />
        <span className="orange_gradient"> AI-Powered Prompts</span>
      </h1>

      <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts.
      </p>

      <Feed />
    </section>
  );
};

export default Home;
