import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(event) {
    event.preventDefault();
    console.log("Login Submitted");
    console.log(email);
    console.log(password);
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
