import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser }from "../services/authService";
import { getMyExpenses }from "../services/expenseService";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const loginData = { email, password };
      const response = await loginUser(loginData);
      console.log(response);
      localStorage.setItem("token", response.token);
      
      const expenses = await getMyExpenses();
      console.log(expenses);
     navigate("/");

    } catch (error)
    {
      console.log(error);
    }
  }

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>

          <p className="text-gray-500 mt-2">Login to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button type="submit">Login</Button>
          <p className="text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-purple-600 font-medium">
              Register
            </Link>
          </p>
          <div className="text-sm text-gray-500">
            <p>Email: {email}</p>

            <p>Password: {password}</p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

export default LoginPage;
