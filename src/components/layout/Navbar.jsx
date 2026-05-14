import { useNavigate } from "react-router-dom";

import Container from "./Container";

function Navbar() {

  const navigate = useNavigate();

  function handleLogout() {

    localStorage.removeItem("token");

    navigate("/login");
  }

  return (

    <header
      className="
        bg-white
        border-b
        border-gray-100
        sticky
        top-0
        z-50
      "
    >

      <Container>

        <div
          className="
            py-4
            flex
            items-center
            justify-between
          "
        >

          <h1
            className="
              text-2xl
              font-bold
              text-purple-600
            "
          >

            Moniq

          </h1>

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            <button

              onClick={handleLogout}

              className="
                text-sm
                text-gray-600
                hover:text-red-500
                transition
                bg-transparent
                border-none
                cursor-pointer
              "
            >

              Logout

            </button>

            <div
              className="
                w-10
                h-10
                rounded-full
                bg-purple-600
                text-white
                flex
                items-center
                justify-center
                font-semibold
              "
            >

              AM

            </div>

          </div>

        </div>

      </Container>

    </header>
  );
}

export default Navbar;