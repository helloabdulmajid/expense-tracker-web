import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  createExpense,
  getExpenseCategories,
  updateExpense,
} from "../services/expenseService";

function AddExpenseModal({
  isOpen,

  onClose,

  onExpenseCreated,

  selectedExpense,
}) {
  const [amount, setAmount] = useState("");

  const [note, setNote] = useState("");

  const [paymentMode, setPaymentMode] = useState("UPI");

  const [category, setCategory] = useState("");

  const [date, setDate] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedExpense) {
      setAmount(selectedExpense.amount);

      setNote(selectedExpense.note);

      setPaymentMode(selectedExpense.paymentMode);

      setCategory(selectedExpense.categoryId);

      setDate(selectedExpense.date);
    } else {
      setAmount("");

      setNote("");

      setPaymentMode("UPI");

      setCategory("");

      setDate("");
    }
  }, [selectedExpense]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const response = await getExpenseCategories();

      setCategories(response);

      if (response.length > 0) {
        setCategory(response[0].id);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!amount || amount <= 0) {
      setError("Please enter valid amount");

      return;
    }

    if (!date) {
      setError("Please select expense date");

      return;
    }

    setError("");

    try {
      const expenseData = {
        amount,

        paymentMode,

        note,

        date,

        categoryId: category,
      };

      if (selectedExpense) {
        await updateExpense(
          selectedExpense.id,

          expenseData,
        );

        toast.success("Expense updated");
      } else {
        await createExpense(expenseData);

        toast.success("Expense added");
      }

      setAmount("");

      setNote("");

      setPaymentMode("UPI");

      setDate("");

      if (categories.length > 0) {
        setCategory(categories[0].id);
      }

      await onExpenseCreated();

      onClose();
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/40
        flex
        items-center
        justify-center
        z-50
        px-4
      "
    >
      <div
        className="
          bg-white
          w-full
          max-w-lg
          rounded-2xl
          p-6
          shadow-xl
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
          <h2
            className="
              text-2xl
              font-bold
              text-gray-800
            "
          >
            {selectedExpense ? "Edit Expense" : "Add Expense"}
          </h2>

          <button
            onClick={onClose}
            className="
              text-gray-500
              hover:text-red-500
              text-xl
            "
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div
              className="
        bg-red-50
        border
        border-red-200
        text-red-600
        text-sm
        rounded-xl
        px-4
        py-3
      "
            >
              {error}
            </div>
          )}

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="
              w-full
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

          <input
            type="text"
            placeholder="Expense note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            className="
              w-full
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

          <select
            value={paymentMode}
            onChange={(event) => setPaymentMode(event.target.value)}
            className="
              w-full
              border
              border-gray-200
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-purple-500
            "
          >
            <option value="UPI">UPI</option>

            <option value="CARD">CARD</option>

            <option value="CASH">CASH</option>
          </select>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="
    w-full
    border
    border-gray-200
    rounded-xl
    px-4
    py-3
    outline-none
    focus:ring-2
    focus:ring-purple-500
  "
          >
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.categoryName}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="
              w-full
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

          <button
            type="submit"
            className="
              w-full
              bg-purple-600
              hover:bg-purple-700
              transition
              text-white
              font-medium
              py-3
              rounded-xl
            "
          >
            {selectedExpense ? "Update Expense" : "Save Expense"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddExpenseModal;
