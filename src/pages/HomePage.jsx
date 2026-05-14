import { useEffect, useState } from "react";
import { getMyExpenses } from "../services/expenseService";
import Navbar from "../components/layout/Navbar";
import { formatCurrency } from "../utils/currency";
import SummaryCard from "../components/SummaryCard";
import AddExpenseModal
from "../components/AddExpenseModal";

function HomePage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] =
  useState(false);

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

  useEffect(() => {

    fetchExpenses();
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
    <>
  <Navbar />
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

    <p className="text-gray-500 mt-2">

      Welcome back to Moniq

    </p>

  </div>

  <button  onClick={() => setIsModalOpen(true)}
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
    amount={
      formatCurrency(
        totalExpenses || 0
      )
    }
  />

  <SummaryCard
    title="Total Income"
    amount={
      formatCurrency(0)
    }
  />

  <SummaryCard
    title="Balance"
    amount={
      formatCurrency(0)
    }
  />

</div>
        <div className=" bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Expenses</h2>

            <p className="text-sm text-gray-500">
              {expenses.content?.length || 0} Transactions
            </p>
          </div>

          {
  expenses.content?.length > 0 ? (

    expenses.content.map((expense) => (

      <div
        key={expense.id}
        className="
          flex
          flex-col
          gap-4
          md:flex-row
          md:items-center
          md:justify-between
          p-4
          rounded-xl
          border
          border-gray-100
          hover:bg-gray-50
          transition
        "
      >

        <div>

          <h3 className="font-semibold text-gray-800">

            {expense.note}

          </h3>

          <p className="text-sm text-gray-500 mt-1">

            {expense.categoryName}

          </p>

        </div>

        <div className="md:text-right">

          <p className="font-bold text-lg">

           {formatCurrency(expense.amount)}

          </p>

          <p className="text-sm text-gray-500 mt-1">

            {expense.paymentMode}

          </p>

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

      <p className="text-gray-500">

        No expenses added yet

      </p>

    </div>
  )
}
        </div>
      </div>
    </div>
    <AddExpenseModal
  isOpen={isModalOpen}

  onClose={() =>
    setIsModalOpen(false)
  }

  onExpenseCreated={
    fetchExpenses
  }
/>
    </>
    
  );
}

export default HomePage;
