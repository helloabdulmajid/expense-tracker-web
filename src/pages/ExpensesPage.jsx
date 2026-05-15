import { useEffect, useState } from "react";
import AddExpenseModal from "../components/AddExpenseModal";
import Navbar from "../components/layout/Navbar";
import { getMyExpenses, deleteExpense } from "../services/expenseService";

import { formatCurrency } from "../utils/currency";

function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOption, setSortOption] = useState("latest");

  const [sortDir, setSortDir] = useState("desc");

  async function fetchExpenses() {
    try {
      setLoading(true);

      const data = await getMyExpenses(
        page,
        keyword,
        paymentMode,
        sortBy,
        sortDir,
      );

      setExpenses(data);

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  }

  useEffect(() => {
    fetchExpenses();
  }, [page, keyword, paymentMode, sortBy, sortDir]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setKeyword(searchTerm);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
        "
      >
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div
        className="
          min-h-screen
          bg-gray-100
          p-4
        "
      >
        <div
          className="
            max-w-6xl
            mx-auto
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              mb-6
            "
          >
            <h1
              className="
                text-3xl
                font-bold
                text-gray-800
              "
            >
              All Expenses
            </h1>

            <p
              className="
                text-gray-500
              "
            >
              Page {page + 1}
            </p>
          </div>

          <div
            className="
    flex
    flex-col
    gap-4
    md:flex-row
    md:items-center
    md:justify-between
    mb-6
  "
          >
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(event) => {
                setPage(0);

                setSearchTerm(event.target.value);
              }}
              className="
      w-full
      md:max-w-md
      border
      border-gray-200
      rounded-xl
      px-4
      py-3
      outline-none
      focus:ring-2
      focus:ring-purple-500
    "
            />

            <div
              className="
      flex
    flex-col
    gap-3
    w-full
    overflow-hidden
    md:w-auto
    md:flex-row
  "
            >
              <select
                value={paymentMode}
                onChange={(event) => {
                  setPaymentMode(event.target.value);

                  setPage(0);
                }}
                className="
  w-full
  max-w-full
  md:w-52
  border
  border-gray-200
  rounded-xl
  px-4
  py-3
  outline-none
  focus:ring-2
  focus:ring-purple-500
  bg-white
"
              >
                <option value="">All Payments</option>

                <option value="CASH">CASH</option>

                <option value="UPI">UPI</option>

                <option value="CARD">CARD</option>
              </select>
              <select
                value={sortOption}
                onChange={(event) => {
                  const value = event.target.value;

                  setSortOption(value);

                  if (value === "latest") {
                    setSortBy("createdAt");

                    setSortDir("desc");
                  } else if (value === "oldest") {
                    setSortBy("createdAt");

                    setSortDir("asc");
                  } else if (value === "high") {
                    setSortBy("amount");

                    setSortDir("desc");
                  } else if (value === "low") {
                    setSortBy("amount");

                    setSortDir("asc");
                  }

                  setPage(0);
                }}
                className="
  w-full
  max-w-full
  md:w-52
  border
  border-gray-200
  rounded-xl
  px-4
  py-3
  outline-none
  focus:ring-2
  focus:ring-purple-500
  bg-white
"
              >
                <option value="latest">Latest First</option>

                <option value="oldest">Oldest First</option>

                <option value="high">Amount High → Low</option>

                <option value="low">Amount Low → High</option>
              </select>
            </div>
          </div>

          <div
            className="
    bg-white
    rounded-3xl
    shadow-sm
    p-6
    space-y-4
  "
          >
            {expenses.content?.map((expense) => (
              <div
                key={expense.id}
                className="
                    border
                    border-gray-100
                    rounded-2xl
                    p-5
                    flex
                    flex-col
                    gap-4
                    md:flex-row
                    md:items-center
                    md:justify-between
                  "
              >
                <div>
                  <div
                    className="
    flex
    flex-col
    items-start
    gap-3
    md:flex-row
    md:items-center
  "
                  >
                    <h2
                      className="
    text-2xl
    font-semibold
    text-gray-800
    break-words
  "
                    >
                      {expense.note}
                    </h2>

                    <span
                      className="
                          px-3
                          py-1
                          rounded-full
                          bg-purple-100
                          text-purple-700
                          text-sm
                          font-medium
                        "
                    >
                      {expense.categoryName}
                    </span>
                  </div>

                  <div
                    className="
                        flex
                        items-center
                        gap-3
                        mt-3
                        text-gray-500
                      "
                  >
                    <p>{expense.date}</p>

                    <span>•</span>

                    <p>{expense.paymentMode}</p>
                  </div>
                </div>

                <div
                  className="
    flex
    flex-col
    w-full
    md:w-auto
    md:items-end
    gap-4
  "
                >
                  <h2
                    className="
      text-3xl
      font-bold
      text-gray-900
    "
                  >
                    {formatCurrency(expense.amount)}
                  </h2>

                  <div
                    className="
      flex
      items-center
      justify-between
      w-full
      md:w-auto
      md:justify-end
      gap-4
    "
                  >
                    <button
                      onClick={() => {
                        setSelectedExpense(expense);

                        setIsModalOpen(true);
                      }}
                      className="
    text-blue-500
    hover:text-blue-700
    hover:bg-blue-50
    px-4
    py-2
    rounded-lg
    transition
  "
                    >
                      Edit
                    </button>

                    <button
                      onClick={async () => {
                        const confirmed = window.confirm(
                          "Delete this expense?",
                        );

                        if (!confirmed) {
                          return;
                        }

                        try {
                          await deleteExpense(expense.id);

                          fetchExpenses();
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                      className="
        text-red-500
        hover:bg-red-50
        px-4
        py-2
        rounded-lg
        transition
      "
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className="
              flex
              items-center
              justify-center
              gap-4
              mt-8
            "
          >
            <button
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              className="
                px-5
                py-2
                rounded-xl
                bg-white
                shadow-sm
                disabled:opacity-50
              "
            >
              Previous
            </button>

            <button
              disabled={expenses.last}
              onClick={() => setPage(page + 1)}
              className="
                px-5
                py-2
                rounded-xl
                bg-purple-600
                text-white
                disabled:opacity-50
              "
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);

          setSelectedExpense(null);
        }}
        onExpenseCreated={fetchExpenses}
        selectedExpense={selectedExpense}
      />
    </>
  );
}

export default ExpensesPage;
