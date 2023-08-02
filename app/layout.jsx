import "@/styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

// This will include the meta-data information for all the files/folders in the current
// directory unless we specify a metadata object for different files/folders.
export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

// This layout function specifies the common layout/UI in the current directory
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            <div className="selected">{children}</div>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
