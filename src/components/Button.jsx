function Button({

  children,

  type = "button",

  onClick

}) {

  return (

    <button

      type={type}

      onClick={onClick}

      className="
        w-full
        bg-purple-600
        hover:bg-purple-700
        text-white
        py-3
        rounded-xl
        font-semibold
        transition
      "
    >

      {children}

    </button>
  );
}

export default Button;