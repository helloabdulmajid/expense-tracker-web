import axiosInstance from "../api/axios";

export async function getMyExpenses( page = 0,
  keyword = "",
  paymentMode = "") {
  const response = await axiosInstance.get(`/expenses/me?page=${page}&keyword=${keyword}&paymentMode=${paymentMode}`);
  return response.data;
}
export async function getDashboardSummary() {
  const response = await axiosInstance.get("/expenses/dashboard-summary");

  return response.data;
}

export async function createExpense(expenseData) {
  const response = await axiosInstance.post("/expenses", expenseData);

  return response.data;
}

export async function getExpenseCategories() {
  const response = await axiosInstance.get("/expense-categories/me");

  return response.data;
}

export async function deleteExpense(expenseId) {
  const response = await axiosInstance.delete(`/expenses/${expenseId}`);

  return response.data;
}

export async function updateExpense(expenseId, expenseData) {
  const response = await axiosInstance.put(
    `/expenses/${expenseId}`,
    expenseData,
  );

  return response.data;
}
