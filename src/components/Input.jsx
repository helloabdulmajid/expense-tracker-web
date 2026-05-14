function Input({
  type = "text",

  placeholder,

  value,

  onChange,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
        w-full
        border
        border-gray-300
        rounded-xl
        px-4
        py-3
        outline-none
        focus:border-purple-500
      "
    />
  );
}

export default Input;
