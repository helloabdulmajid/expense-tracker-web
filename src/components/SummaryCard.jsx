function SummaryCard({

  title,
  amount,

}) {

  return (

    <div
      className="
        bg-white
        rounded-2xl
        p-6
        shadow-sm
        border
        border-gray-100
      "
    >

      <h2
        className="
          text-sm
          text-gray-500
        "
      >

        {title}

      </h2>

      <p
        className="
          text-3xl
          font-bold
          mt-3
        "
      >

        {amount}

      </p>

    </div>
  );
}

export default SummaryCard;