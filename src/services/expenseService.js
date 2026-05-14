import axiosInstance from "../api/axios";

export async function getMyExpenses() {
  const response = await axiosInstance.get("/expenses/me");
  return response.data;
}

export async function createExpense(expenseData) {
  const response = await axiosInstance.post("/expenses", expenseData);

  return response.data;
}

export async function getExpenseCategories() {

  const response =
    await axiosInstance.get(
      "/expense-categories/me"
    );

  return response.data;
}
