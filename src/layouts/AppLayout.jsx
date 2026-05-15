import Navbar from "../components/layout/Navbar";

function AppLayout({ children }) {

  return (

    <div
      className="
        min-h-screen
        bg-gray-100
      "
    >

      <Navbar />

      <main>

        {children}

      </main>

    </div>
  );
}

export default AppLayout;