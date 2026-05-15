import { useEffect, useState } from "react";
import {
  getMyExpenses,
  deleteExpense,
  getDashboardSummary,
} from "../services/expenseService";
import Navbar from "../components/layout/Navbar";
import { formatCurrency } from "../utils/currency";
import SummaryCard from "../components/SummaryCard";
import AddExpenseModal from "../components/AddExpenseModal";
import { formatDate } from "../utils/date";
import AppLayout from "../layouts/AppLayout";
import { Link } from "react-router-dom";

function HomePage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [summary, setSummary] = useState(null);

  async function fetchExpenses() {
    try {
      setLoading(true);
      const data = await getMyExpenses();
      console.log(data);
      setExpenses(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  async function fetchSummary() {
    try {
      const data = await getDashboardSummary();

      setSummary(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function refreshDashboard() {
    await fetchExpenses();

    await fetchSummary();
  }

  useEffect(() => {
    fetchExpenses();

    fetchSummary();
  }, []);

  const totalExpenses = expenses.content?.reduce(
    (total, expense) => total + expense.amount,
    0,
  );

  if (loading) {
    return (
      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-100
      "
      >
        <p
          className="
          text-lg
          text-gray-500
        "
        >
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-6xl mx-auto p-4 space-y-6">
          <div
            className="
    flex
    flex-col
    gap-4
    md:flex-row
    md:items-center
    md:justify-between
  "
          >
            <div>
              <h1
                className="
        text-3xl
        font-bold
        text-gray-800
      "
              >
                Dashboard
              </h1>

              <p className="text-gray-500 mt-2">Welcome back to Moniq</p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="
      bg-purple-600
      hover:bg-purple-700
      transition
      text-white
      font-medium
      px-5
      py-3
      rounded-xl
      shadow-sm
    "
            >
              + Add Expense
            </button>
          </div>

          <div
            className="
    grid
    grid-cols-1
    md:grid-cols-3
    gap-6
  "
          >
            <SummaryCard
              title="Total Expenses"
              amount={formatCurrency(summary?.totalExpenses || 0)}
            />

            <SummaryCard
              title="Total Income"
              amount={formatCurrency(summary?.totalIncome || 0)}
            />

            <SummaryCard
              title="Balance"
              amount={formatCurrency(summary?.balance || 0)}
            />
          </div>
          <div className=" bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="mb-6">
              {/* MOBILE */}

              <div className="block md:hidden">
                <h2
                  className="
        text-xl
        font-bold
        text-gray-800
        text-center
        mb-4
      "
                >
                  Recent Expenses
                </h2>

                <div
                  className="
        flex
        items-center
        justify-between
      "
                >
                  <Link
                    to="/expenses"
                    className="
          text-purple-600
          hover:text-purple-700
          text-sm
          font-medium
        "
                  >
                    View All
                  </Link>

                  <p
                    className="
          text-sm
          text-gray-500
        "
                  >
                    {expenses.content?.length || 0} Transactions
                  </p>
                </div>
              </div>

              {/* DESKTOP */}

              <div
                className="
      hidden
      md:flex
      items-center
      justify-between
    "
              >
                <h2
                  className="
        text-xl
        font-bold
        text-gray-800
      "
                >
                  Recent Expenses
                </h2>

                <div
                  className="
        flex
        items-center
        gap-4
      "
                >
                  <Link
                    to="/expenses"
                    className="
          text-purple-600
          hover:text-purple-700
          text-sm
          font-medium
        "
                  >
                    View All
                  </Link>

                  <p
                    className="
          text-sm
          text-gray-500
        "
                  >
                    {expenses.content?.length || 0} Transactions
                  </p>
                </div>
              </div>
            </div>

            {expenses.content?.length > 0 ? (
              expenses.content.map((expense) => (
                <div
                  key={expense.id}
                  className="
        bg-white
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
        hover:shadow-md
        transition
      "
                >
                  <div className="space-y-3">
                    <div
                      className="
            flex
            items-center
            gap-2
            flex-wrap
          "
                    >
                      <h3
                        className="
              font-semibold
              text-lg
              text-gray-800
            "
                      >
                        {expense.note || "Expense"}
                      </h3>

                      <span
                        className="
              text-xs
              bg-purple-100
              text-purple-700
              px-3
              py-1
              rounded-full
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
            flex-wrap
            text-sm
            text-gray-500
          "
                    >
                      <p>{formatDate(expense.date)}</p>

                      <span>•</span>

                      <p>{expense.paymentMode}</p>
                    </div>
                  </div>

                  <div
                    className="
    md:text-right
    flex
    flex-col
    items-start
    md:items-end
    gap-2
  "
                  >
                    <p className="font-bold text-lg">
                      {formatCurrency(expense.amount)}
                    </p>

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
    text-sm
    font-medium
    text-blue-600
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

                            await refreshDashboard();
                          } catch (error) {
                            console.log(error);
                          }
                        }}
                        className="
    text-sm
    font-medium
    text-red-600
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
              ))
            ) : (
              <div
                className="
      text-center
      py-10
    "
              >
                <div
                  className="
    flex
    flex-col
    items-center
    justify-center
    py-14
    text-center
  "
                >
                  <div
                    className="
      w-20
      h-20
      rounded-full
      bg-purple-100
      flex
      items-center
      justify-center
      text-3xl
      mb-4
    "
                  >
                    💸
                  </div>

                  <h3
                    className="
      text-lg
      font-semibold
      text-gray-800
    "
                  >
                    No expenses yet
                  </h3>

                  <p
                    className="
      text-gray-500
      mt-2
      max-w-sm
    "
                  >
                    Start tracking your spending by adding your first expense.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);

          setSelectedExpense(null);
        }}
        onExpenseCreated={refreshDashboard}
        selectedExpense={selectedExpense}
      />
    </AppLayout>
  );
}

export default HomePage;
