"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import logo from "../public/assets/images/logo.svg";
import mobNavStyles from "../styles/menu.module.css";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    async function setUpProviders() {
      const resp = await getProviders();
      setProviders(resp);
    }
    setUpProviders();
  }, []);

  const handleToggle = () => {
    document
      .querySelector(`.${mobNavStyles.menu_btn}`)
      .classList.toggle(mobNavStyles.toggle_menu);
    document.querySelector(`#slide_left`).classList.toggle(mobNavStyles.slide);
    if (!selected)
      document.querySelector(".selected").style.filter = "blur(5px)";
    else document.querySelector(".selected").style.filter = "blur(0px)";
    setSelected((prev) => !prev);
  };

  return (
    <nav className="w-full flex justify-between items-center mb-4 pt-3">
      <Link href="/" prefetch={false} className="flex gap-x-2 justify-center">
        <Image
          src={logo}
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        ></Image>
        <p className="logo_text">Promptopia</p>
      </Link>

      {/*Nav-bar for bigger devices*/}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-x-2 md:gap-x-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button onClick={signOut} className="outline_btn">
              Sign out
            </button>
            <Link href="/profile" prefetch={false}>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                alt="Profile picture"
                className="rounded-full"
                title="Profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation-bar start*/}
      <div className="sm:hidden flex">
        {session?.user ? (
          <div>
            <div className={mobNavStyles.menu_btn} onClick={handleToggle}>
              <span className={mobNavStyles.frios_top} />
              <span className={mobNavStyles.frios_middle} />
              <span className={mobNavStyles.frios_bottom} />
            </div>
            <div id="slide_left" className="hidden">
              <div className="flex flex-col p-7">
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  alt="Profile Picture"
                  className="w-9 h-9 rounded-full"
                ></Image>
                <Link href="/profile" className="mt-2 font-bold w-[150px]">
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="font-bold w-[150px]"
                  onClick={handleToggle}
                >
                  Create Prompt
                </Link>
                <button onClick={signOut} className="mt-5 black_btn w-[120px]">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile Navigation-bar ends here*/}
    </nav>
  );
};

export default Nav;
